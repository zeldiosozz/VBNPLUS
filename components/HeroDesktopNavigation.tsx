import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

type LinkItem = { href: string; label: string };

export default function HeroDesktopNavigation({
  navLabel,
  links,
  servicesLabel,
}: {
  navLabel: string;
  links: LinkItem[];
  servicesLabel: string;
}) {
  return (
    <NavigationMenu
      aria-label={navLabel}
      align="center"
      delay={90}
      closeDelay={180}
      className="hidden lg:flex"
    >
      <NavigationMenuList className="gap-1">
        {links.slice(0, 2).map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              href={link.href}
              closeOnClick
              className="whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white focus:bg-white/[0.08] focus:text-white"
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem value="services">
          <NavigationMenuLink
            href="#services"
            closeOnClick
            className="whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white focus:bg-white/[0.08] focus:text-white"
          >
            {servicesLabel}
          </NavigationMenuLink>
        </NavigationMenuItem>

        {links.slice(2).map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              href={link.href}
              closeOnClick
              className="whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white focus:bg-white/[0.08] focus:text-white"
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
