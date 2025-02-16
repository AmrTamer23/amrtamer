type Project = {
  name: string;
  domain: string;
  description: string;
  fullDescription?: string;
  features: string[];
  technologies: string[];
  link: string;
  sourceCode: string | null;
  image: string;
  thumbnail: string;
  galleryImages: string[];
};

type Section = "home" | "projects" | "work" | "blog";

type Work = {
  location: string;
  role: string;
  date: string;
  company: string;
  companyLink: string;
  description: string;
  skills: string;
};

interface NotionUser {
  object: "user";
  id: string;
}

interface NotionTitle {
  type: "text";
  text: {
    content: string;
    link: null | string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: null | string;
}

interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  cover: null | any; // You can define a more specific type if needed
  icon: null | any; // You can define a more specific type if needed
  parent: {
    type: "workspace";
    workspace: boolean;
  };
  archived: boolean;
  in_trash: boolean;
  properties: {
    title: {
      id: string;
      type: "title";
      title: NotionTitle[];
    };
  };
  url: string;
  public_url: string;
  request_id: string;
}
