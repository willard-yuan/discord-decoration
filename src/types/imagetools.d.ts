// Type declarations to satisfy editor diagnostics for vite-imagetools imports
// Covers common query combinations used in this project.

declare module "*\u0026as=picture" {
  const data: {
    img: { src: string; w?: number; h?: number };
    sources: Array<{ type?: string; srcset: string }>;
  };
  export default data;
}

declare module "*\u003Fimagetools*" {
  const anyData: any;
  export default anyData;
}

declare module "*\u0026as=img" {
  const img: { src: string; w?: number; h?: number };
  export default img;
}

declare module "*\u0026as=src" {
  const src: string;
  export default src;
}

declare module "*\u0026as=metadata" {
  const metadata: Record<string, any>;
  export default metadata;
}

// Wildcards for transformation directives
declare module "*\u0026w=*" {
  const anyData: any;
  export default anyData;
}
declare module "*\u0026h=*" {
  const anyData: any;
  export default anyData;
}
declare module "*\u0026format=*" {
  const anyData: any;
  export default anyData;
}