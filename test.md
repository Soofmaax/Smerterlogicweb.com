#include <unistd.h>

void	ft_putchar(char c)
{
	write(1, &c, 1);
}

void	rush1x(int x, int y)
{
	int	iy = y - 2;

	ft_putchar('o');
	while (iy > 0)
	{
		ft_putchar(10);
		ft_putchar('|');
		iy--;
	}
	if (y > 1)
	{
		ft_putchar(10);
		ft_putchar('o');
		ft_putchar(10);
	}
}

void	rush(int x, int y)
{
	if (x == 1)
	{
		rush1x(x, y);
	}
	if (x > 1)
	{
		int	ix = x - 2;
		int	iy = y - 2;

		ft_putchar('o');
		while (ix > 0)
		{
			ft_putchar('-');
			ix--;
		}
		ft_putchar('o');
		ft_putchar(10);

		while (iy > 0)
		{
			ft_putchar('|');
			ix = x - 2;
			while (ix > 0)
			{
				ft_putchar(' ');
				ix--;
			}
			ft_putchar('|');
			ft_putchar(10);
		iy--;
		}

		if (y > 1)
		{
			ft_putchar('o');
			ix = x - 2;
			while (ix > 0)
			{
				ft_putchar('-');
				ix--;
			}
			ft_putchar('o');
			ft_putchar(10);
		}	
	}
}
