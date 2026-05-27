// Mirrors _config.yml + _data/navigation.yml in the Jekyll repo.
// When porting back: edit those files, not this one.

export const site = {
  title: "Software Studies",
  tagline: "​",
  url: "https://damien.house",
};

export const author = {
  name: "Damien House",
  bio: "​",
  location: "On the web",
  links: [
    { label: "109.studio", href: "https://109.studio" },
    { label: "GitHub", href: "https://github.com" },
    { label: "RSS", href: "/feed.xml" },
  ],
};

// _data/navigation.yml → main:
export const mainNav = [
  { title: "About", to: "/about" },
  { title: "Categories", to: "/categories" },
  { title: "Tags", to: "/tags" },
  { title: "Archive", to: "/archive" },
  { title: "Resource", to: "/resource" },
  { title: "Practice", to: "/practice" },
] as const;
