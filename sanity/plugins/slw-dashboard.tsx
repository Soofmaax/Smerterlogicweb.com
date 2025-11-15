import React, {useEffect, useState} from "react";
import {definePlugin, useClient} from "sanity";

type PostItem = {
  _id: string;
  title: string;
  locale?: string;
  publishAt?: string;
  published?: boolean;
  draft?: boolean;
};

type NewsletterItem = {
  _id: string;
  title: string;
  slug: {current: string} | string;
  locale?: string;
  sendAt?: string;
  ready?: boolean;
};

function Dashboard() {
  const client = useClient({apiVersion: process.env.SANITY_API_VERSION || "2025-11-14"});
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<any>(null);
  const [latestPosts, setLatestPosts] = useState<PostItem[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);

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
        _id, title, locale, publishAt, published, draft
      }`);

      const nl: NewsletterItem[] = await client.fetch(`*[_type == "newsletter"] | order(coalesce(sendAt, _updatedAt) desc)[0...6]{
        _id, title, slug, locale, sendAt, ready
      }`);

      setCounts(c);
      setLatestPosts(lp);
      setNewsletters(nl);
      setLoading(false);
    }
    load().catch(() => setLoading(false));
  }, [client]);

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

      <div style={{display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap"}}>
        <button className="slw-btn" onClick={() => gotoCreate("post")}>+ New Post</button>
        <button className="slw-btn" onClick={() => gotoCreate("newsletter")}>+ New Newsletter</button>
        <button className="slw-btn" onClick={() => gotoDesk("post")}>Open Posts</button>
        <button className="slw-btn" onClick={() => gotoDesk("newsletter")}>Open Newsletters</button>
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