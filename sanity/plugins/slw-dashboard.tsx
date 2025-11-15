import React, {useEffect, useMemo, useState} from "react";
import {definePlugin, useClient} from "sanity";

type PostItem = {
  _id: string;
  title: string;
  locale?: string;
  publishAt?: string;
  published?: boolean;
  draft?: boolean;
  tags?: string[];
};

type NewsletterItem = {
  _id: string;
  title: string;
  slug: {current: string} | string;
  locale?: string;
  sendAt?: string;
  ready?: boolean;
};

type ScheduledItem = {
  id: string;
  title: string;
  meta: string;
  onOpen: () => void;
  extra?: React.ReactNode;
  _l?: string; // locale
  _tags?: string[]; // for posts only
};

const DEPLOY_HOOK = (process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK_URL || process.env.VERCEL_DEPLOY_HOOK_URL || "") as string;

function Dashboard() {
  const client = useClient({apiVersion: process.env.SANITY_API_VERSION || "2025-11-14"});
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<any>(null);
  const [latestPosts, setLatestPosts] = useState<PostItem[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [draftPosts, setDraftPosts] = useState<PostItem[]>([]);
  const [scheduledWeek, setScheduledWeek] = useState<ScheduledItem[]>([]);
  const [deployStatus, setDeployStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  // Filters
  const [filterLocale, setFilterLocale] = useState<"all" | "fr" | "en">("all");
  const [filterTag, setFilterTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const c = await client.fetch(`{
        "postsTotal": count(*[_type == "post"]),
        "postsFr": count(*[_type == "post" && locale == "fr"]),
        "postsEn": count(*[_type == "post" && locale == "en"]),
        "postsDrafts": count(*[_type == "post" && draft == true]),
        "postsPublished": count(*[_type == "post" && published == true && (draft != true)]),
        "postsScheduled": count(*[_type == "post" && defined(publishAt) && publishAt > now()]),
        "newslettersTotal": count(*[_type == "newsletter"]),
        "newslettersReady": count(*[_type == "newsletter" && ready == true]),
        "newslettersScheduled": count(*[_type == "newsletter" && defined(sendAt) && sendAt > now()])
      }`);

      const lp: PostItem[] = await client.fetch(`*[_type == "post"] | order(coalesce(publishAt, _updatedAt) desc)[0...6]{
        _id, title, locale, publishAt, published, draft, tags
      }`);

      const nl: NewsletterItem[] = await client.fetch(`*[_type == "newsletter"] | order(coalesce(sendAt, _updatedAt) desc)[0...6]{
        _id, title, slug, locale, sendAt, ready
      }`);

      const drafts: PostItem[] = await client.fetch(`*[_type == "post" && (draft == true || published != true)] | order(_updatedAt desc)[0...50]{
        _id, title, locale, publishAt, published, draft, tags
      }`);

      // Scheduled in next 7 days (posts + newsletters)
      const schedPosts: PostItem[] = await client.fetch(`*[_type == "post" && defined(publishAt) && publishAt > now()] | order(publishAt asc)[0...100]{ _id, title, locale, publishAt, published, draft, tags }`);
      const schedNl: NewsletterItem[] = await client.fetch(`*[_type == "newsletter" && defined(sendAt) && sendAt > now()] | order(sendAt asc)[0...100]{ _id, title, slug, locale, sendAt, ready }`);

      // Distinct tags
      const tags: string[] = await client.fetch(`array::unique(*[_type == "post" && defined(tags)].tags[])`);

      const now = Date.now();
      const weekMs = 7 * 24 * 60 * 60 * 1000;

      const items: ScheduledItem[] = [];

      for (const p of schedPosts) {
        if (!p.publishAt) continue;
        const ts = new Date(p.publishAt).getTime();
        if (Number.isFinite(ts) && ts - now <= weekMs) {
          items.push({
            id: p._id,
            title: p.title,
            meta: [`POST`, p.locale ? p.locale.toUpperCase() : "—", new Date(p.publishAt).toLocaleString()].filter(Boolean).join(" • "),
            onOpen: () => window.location.assign(`/studio/intent/edit?type=post&id=${encodeURIComponent(p._id)}`),
            _l: p.locale,
            _tags: p.tags || [],
          });
        }
      }

      for (const n of schedNl) {
        if (!n.sendAt) continue;
        const ts = new Date(n.sendAt).getTime();
        if (Number.isFinite(ts) && ts - now <= weekMs) {
          const slug = typeof n.slug === "string" ? n.slug : (n.slug?.current || "");
          items.push({
            id: n._id,
            title: n.title,
            meta: [`NL`, n.locale ? n.locale.toUpperCase() : "—", new Date(n.sendAt).toLocaleString()].filter(Boolean).join(" • "),
            onOpen: () => window.location.assign(`/studio/intent/edit?type=newsletter&id=${encodeURIComponent(n._id)}`),
            extra: slug ? <a href={`/api/newsletter/${slug}`} target="_blank" rel="noopener noreferrer">Preview HTML</a> : null,
            _l: n.locale,
          });
        }
      }

      setCounts(c);
      setLatestPosts(lp);
      setNewsletters(nl);
      setDraftPosts(drafts);
      setScheduledWeek(items);
      setTagList(tags.filter(Boolean).sort((a, b) => a.localeCompare(b)));
      setLoading(false);
    }
    load().catch(() => setLoading(false));
  }, [client]);

  // Derived filters
  const filteredDrafts = useMemo(() => {
    return draftPosts.filter((p) => {
      if (filterLocale !== "all" && p.locale !== filterLocale) return false;
      if (filterTag && !(p.tags || []).includes(filterTag)) return false;
      return true;
    });
  }, [draftPosts, filterLocale, filterTag]);

  const filteredScheduled = useMemo(() => {
    return scheduledWeek.filter((it) => {
      if (filterLocale !== "all" && it._l && it._l !== filterLocale) return false;
      if (filterTag) {
        // Only posts have _tags; newsletters (no _tags) are hidden when a tag filter is active
        if (!it._tags) return false;
        if (!it._tags.includes(filterTag)) return false;
      }
      return true;
    });
  }, [scheduledWeek, filterLocale, filterTag]);

  async function triggerDeploy() {
    if (!DEPLOY_HOOK) {
      alert("DEPLOY HOOK manquant. Définis NEXT_PUBLIC_VERCEL_DEPLOY_HOOK_URL.");
      return;
    }
    try {
      setDeployStatus("loading");
      const res = await fetch(DEPLOY_HOOK, {method: "POST"});
      if (res.ok) setDeployStatus("ok");
      else setDeployStatus("err");
    } catch {
      setDeployStatus("err");
    } finally {
      setTimeout(() => setDeployStatus("idle"), 4000);
    }
  }

  function gotoCreate(type: string) {
    const url = `/studio/intent/create?type=${encodeURIComponent(type)}`;
    window.location.assign(url);
  }
  function gotoDesk(type?: string) {
    const url = type ? `/studio/desk/${encodeURIComponent(type)}` : `/studio/desk`;
    window.location.assign(url);
  }

  return (
    <div style={{padding: 16}}>
      <h1 style={{margin: "0 0 16px", fontSize: 24}}>Dashboard</h1>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 16}}>
        <Card title="Posts total" value={counts?.postsTotal} />
        <Card title="FR posts" value={counts?.postsFr} />
        <Card title="EN posts" value={counts?.postsEn} />
        <Card title="Published" value={counts?.postsPublished} />
        <Card title="Drafts" value={counts?.postsDrafts} />
        <Card title="Scheduled" value={counts?.postsScheduled} />
        <Card title="Newsletters" value={counts?.newslettersTotal} />
        <Card title="Ready NL" value={counts?.newslettersReady} />
        <Card title="Scheduled NL" value={counts?.newslettersScheduled} />
      </div>

      <div style={{display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap"}}>
        {/* Filters */}
        <select value={filterLocale} onChange={(e) => setFilterLocale(e.target.value as any)} style={{padding: 8, borderRadius: 6, border: "1px solid #e5e7eb"}}>
          <option value="all">All locales</option>
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
        <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} style={{padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", minWidth: 200}}>
          <option value="">All tags</option>
          {tagList.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={{display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap"}}>
        <button className="slw-btn" onClick={() => gotoCreate("post")}>+ New Post</button>
        <button className="slw-btn" onClick={() => gotoCreate("newsletter")}>+ New Newsletter</button>
        <button className="slw-btn" onClick={() => gotoDesk("post")}>Open Posts</button>
        <button className="slw-btn" onClick={() => gotoDesk("newsletter")}>Open Newsletters</button>
        <button className="slw-btn" onClick={triggerDeploy} disabled={deployStatus === "loading" || !DEPLOY_HOOK}>
          {deployStatus === "loading" ? "Deploying…" : "Trigger Vercel Deploy"}
        </button>
        {deployStatus === "ok" && <span style={{color:"#16a34a", fontWeight:600}}>OK</span>}
        {deployStatus === "err" && <span style={{color:"#dc2626", fontWeight:600}}>Erreur</span>}
        <style>{`
          .slw-btn {
            background: #0ea5e9;
            color: #fff;
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
          }
          .slw-btn:disabled { opacity: 0.6; cursor: not-allowed; }
          .slw-btn:hover { background: #0284c7; }
        `}</style>
      </div>

      <Section title="Latest posts">
        <List items={latestPosts.map((p) => ({
          id: p._id,
          title: p.title,
          meta: [
            p.locale ? p.locale.toUpperCase() : "—",
            p.published ? "published" : p.draft ? "draft" : "—",
            p.publishAt ? new Date(p.publishAt).toLocaleDateString() : ""
          ].filter(Boolean).join(" • "),
          onOpen: () => window.location.assign(`/studio/intent/edit?type=post&id=${encodeURIComponent(p._id)}`)
        }))} />
      </Section>

      <Section title="Drafts à relire">
        <List items={filteredDrafts.map((p) => ({
          id: p._id,
          title: p.title,
          meta: [
            p.locale ? p.locale.toUpperCase() : "—",
            p.draft ? "draft" : (p.published ? "published" : "—"),
            p.publishAt ? new Date(p.publishAt).toLocaleDateString() : ""
          ].filter(Boolean).join(" • "),
          onOpen: () => window.location.assign(`/studio/intent/edit?type=post&id=${encodeURIComponent(p._id)}`)
        }))} />
      </Section>

      <Section title="Programmés (7 jours)">
        <List items={filteredScheduled} />
      </Section>

      <Section title="Newsletters">
        <List items={newsletters.map((n) => {
          const slug = typeof n.slug === "string" ? n.slug : (n.slug?.current || "");
          return {
            id: n._id,
            title: n.title,
            meta: [
              n.locale ? n.locale.toUpperCase() : "—",
              n.ready ? "ready" : "draft",
              n.sendAt ? new Date(n.sendAt).toLocaleDateString() : ""
            ].filter(Boolean).join(" • "),
            onOpen: () => window.location.assign(`/studio/intent/edit?type=newsletter&id=${encodeURIComponent(n._id)}`),
            extra: slug ? <a href={`/api/newsletter/${slug}`} target="_blank" rel="noopener noreferrer">Preview HTML</a> : null
          };
        })} />
      </Section>

      {loading && <p>Loading…</p>}
    </div>
  );
}

function Card(props: {title: string; value: any}) {
  return (
    <div style={{border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, background: "#fff"}}>
      <div style={{color: "#6b7280", fontSize: 12}}>{props.title}</div>
      <div style={{fontSize: 22, fontWeight: 700}}>{props.value ?? "—"}</div>
    </div>
  );
}

function Section(props: {title: string; children: React.ReactNode}) {
  return (
    <div style={{marginBottom: 20}}>
      <h2 style={{margin: "0 0 8px", fontSize: 18}}>{props.title}</h2>
      <div style={{border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff"}}>
        {props.children}
      </div>
    </div>
  );
}

function List(props: {items: Array<{id: string; title: string; meta?: string; onOpen?: () => void; extra?: React.ReactNode}>}) {
  return (
    <ul style={{listStyle: "none", margin: 0, padding: 0}}>
      {props.items.map((it) => (
        <li key={it.id} style={{padding: "10px 12px", borderTop: "1px solid #f3f4f6"}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10}}>
            <div>
              <div style={{fontWeight: 600}}>{it.title}</div>
              {it.meta && <div style={{color: "#6b7280", fontSize: 12}}>{it.meta}</div>}
            </div>
            <div style={{display: "flex", gap: 8, alignItems: "center"}}>
              {it.extra}
              <button className="slw-btn" onClick={it.onOpen}>Open</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export const slwDashboard = definePlugin({
  name: "slw-dashboard",
  tools: (prev) => [
    ...prev,
    {
      name: "dashboard",
      title: "Dashboard",
      component: Dashboard,
    },
  ],
});