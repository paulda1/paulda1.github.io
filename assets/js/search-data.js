// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-",
    title: "",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-gsoc-week-3-ft8-encoder-block-development-pt3",
        
          title: "GSoC Week 3: FT8 Encoder Block Development Pt3",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/GSoC-Week-3-FT8-Encoder-Block-Development-Pt3/";
          
        },
      },{id: "post-gsoc-week-3-ft8-encoder-block-development-pt2",
        
          title: "GSoC Week 3: FT8 Encoder Block Development Pt2",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/GSoC-Week-3-FT8-Encoder-Block-Development-Pt2/";
          
        },
      },{id: "post-gsoc-week-2-ft8-encoder-block-development",
        
          title: "GSoC Week 2: FT8 Encoder Block Development",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/GSoC-Week-2-FT8-Encoder-Block-Development/";
          
        },
      },{id: "post-gsoc-week-1-ft8-research-and-technical-prep",
        
          title: "GSoC Week 1: FT8 Research and Technical Prep",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/GSoC-Week-1-FT8-Research-and-Technical-Preparation/";
          
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
