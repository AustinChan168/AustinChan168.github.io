import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_ByNBwz4f.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/","cacheDir":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/node_modules/.astro/","outDir":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/","srcDir":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/","publicDir":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/public/","buildClientDir":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/client/","buildServerDir":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/server/","adapterName":"","routes":[{"file":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/en/writing/feed.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/writing/feed.xml","isIndex":false,"type":"endpoint","pattern":"^\\/en\\/writing\\/feed\\.xml\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"writing","dynamic":false,"spread":false}],[{"content":"feed.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/writing/feed.xml.js","pathname":"/en/writing/feed.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/en/writing/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.9TZvvVL4.css"}],"routeData":{"route":"/en/writing","isIndex":true,"type":"page","pattern":"^\\/en\\/writing\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"writing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/writing/index.astro","pathname":"/en/writing","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/en/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.9TZvvVL4.css"}],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/sitemap.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml\\/?$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.ts","pathname":"/sitemap.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/writing/feed.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/writing/feed.xml","isIndex":false,"type":"endpoint","pattern":"^\\/writing\\/feed\\.xml\\/?$","segments":[[{"content":"writing","dynamic":false,"spread":false}],[{"content":"feed.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/writing/feed.xml.js","pathname":"/writing/feed.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/writing/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.9TZvvVL4.css"}],"routeData":{"route":"/writing","isIndex":true,"type":"page","pattern":"^\\/writing\\/?$","segments":[[{"content":"writing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/writing/index.astro","pathname":"/writing","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.9TZvvVL4.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://austinchan168.github.io","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/en/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/en/works/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/en/writing/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/en/writing/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/works/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/writing/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/writing/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/PostContent.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/writing/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/writing/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/lib/posts.ts",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/PageBody.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/WritingList.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/writing/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/writing/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/works/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/works/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/lib/feed.ts",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/en/writing/feed.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/writing/feed.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/writing/feed.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/writing/feed.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/robots.txt.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/robots.txt@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/pages/sitemap.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/sitemap.xml@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/en/works/[slug]@_@astro":"pages/en/works/_slug_.astro.mjs","\u0000@astro-page:src/pages/en/writing/[...slug]@_@astro":"pages/en/writing/_---slug_.astro.mjs","\u0000@astro-page:src/pages/en/writing/feed.xml@_@js":"pages/en/writing/feed.xml.astro.mjs","\u0000@astro-page:src/pages/en/writing/index@_@astro":"pages/en/writing.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/sitemap.xml@_@ts":"pages/sitemap.xml.astro.mjs","\u0000@astro-page:src/pages/works/[slug]@_@astro":"pages/works/_slug_.astro.mjs","\u0000@astro-page:src/pages/writing/[...slug]@_@astro":"pages/writing/_---slug_.astro.mjs","\u0000@astro-page:src/pages/writing/feed.xml@_@js":"pages/writing/feed.xml.astro.mjs","\u0000@astro-page:src/pages/writing/index@_@astro":"pages/writing.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astrojs-manifest":"manifest_CflS5mD_.mjs","/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CnWQBJ9J.mjs","/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_RnbJt1V1.mjs","/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/BackdropCanvas.astro?astro&type=script&index=0&lang.ts":"_astro/BackdropCanvas.astro_astro_type_script_index_0_lang.Ch1X0QT-.js","/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/WorkDetail.astro?astro&type=script&index=0&lang.ts":"_astro/WorkDetail.astro_astro_type_script_index_0_lang.DfkaIJ3t.js","/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/Works.astro?astro&type=script&index=0&lang.ts":"_astro/Works.astro_astro_type_script_index_0_lang.PyrhSUc7.js","/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.BAb7ZOaf.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/BackdropCanvas.astro?astro&type=script&index=0&lang.ts","const L=document.querySelector(\".backdrop\");if(L instanceof HTMLCanvasElement){const h=L.getContext(\"2d\");h&&Y(L,h)}function Y(h,t){const d=window.matchMedia(\"(prefers-reduced-motion: reduce)\");let r=0,f=0,u=1,M=0,k=!1,v=0;const i={x:.5,y:.35,tx:.5,ty:.35,active:!1};let p=[27,27,25];const b=[\"#ff775f\",\"#87e6c0\",\"#92cfff\",\"#f2d95c\",\"#c8a8e8\"].concat([\"#1b1b19\"]);function S(){const n=getComputedStyle(document.documentElement);p=H(n.getPropertyValue(\"--ink\"),p)}function H(n,o){const a=(n||\"\").trim(),l=a.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(l){let e=l[1];return e.length===3&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}const s=a.match(/rgba?\\(([^)]+)\\)/);if(s){const e=s[1].split(/[,\\s/]+/).filter(Boolean).map(Number);if(e.length>=3&&e.every(c=>!Number.isNaN(c)))return[e[0],e[1],e[2]]}return o}const T=n=>`rgba(${p[0]}, ${p[1]}, ${p[2]}, ${n})`;function A(){u=Math.min(window.devicePixelRatio||1,2),r=window.innerWidth,f=window.innerHeight,h.width=Math.floor(r*u),h.height=Math.floor(f*u),h.style.width=r+\"px\",h.style.height=f+\"px\",t.setTransform(u,0,0,u,0,0)}function m(n){v||(v=n);const o=(n-v)/1e3*.9;i.x+=(i.tx-i.x)*.05,i.y+=(i.ty-i.y)*.05,t.clearRect(0,0,r,f),N(o),R(o),F(o),d.matches||(M=requestAnimationFrame(m))}function N(n){const o=r<680?58:82,a=Math.sin(n)*10,l=(i.x-.5)*26;t.strokeStyle=T(.08),t.lineWidth=1,t.beginPath();for(let s=-o;s<r+o;s+=o)t.moveTo(s+a+l,0),t.lineTo(s-34+l,f);t.stroke()}function R(n){const o=Math.max(5,Math.min(9,Math.round(f/96))),a=r<680?50:58,l=f*.16+i.y*30,s=r+240;for(let e=0;e<o;e+=1){const c=l+e*a,w=e%2===0?1:-1,y=(n*46+e*120)%s*w,g=w===1?y-180:r+60-y;t.strokeStyle=T(e%2?.1:.16),t.lineWidth=1,t.beginPath(),t.moveTo(0,c),t.lineTo(r,c),t.stroke();const I=108+e*8,$=r<680?12:15;t.save(),t.globalAlpha=e===0?.62:.46,t.fillStyle=b[e%b.length],t.fillRect(g,c-$/2,I,$),t.restore(),q(g+I+34,c,r<680?9:11,b[(e+1)%b.length],n+e)}}function q(n,o,a,l,s){t.save(),t.translate(n,o),t.rotate(Math.PI/4+Math.sin(s*.6)*.25),t.globalAlpha=.5,t.fillStyle=l,t.fillRect(-a/2,-a/2,a,a),t.restore()}function F(n){const o=r*(.72+(i.x-.5)*.06),a=f*.48+(i.y-.5)*20,l=90,s=Math.min(1,r/900);t.strokeStyle=T(.34),t.lineWidth=1.6,t.beginPath();for(let e=0;e<l;e+=1){const c=e*.22+n*.7,w=(34+e*2.3)*(.7+s*.3),y=o+Math.cos(c)*w,g=a+Math.sin(c*.74)*w*.36;e===0?t.moveTo(y,g):t.lineTo(y,g)}t.stroke()}function E(){k||(k=!0,v=0,M=requestAnimationFrame(m))}function P(){k=!1,cancelAnimationFrame(M)}let W=0;window.addEventListener(\"resize\",()=>{clearTimeout(W),W=window.setTimeout(()=>{A(),d.matches&&m(0)},150)}),window.addEventListener(\"pointermove\",n=>{n.pointerType!==\"touch\"&&(i.tx=n.clientX/Math.max(window.innerWidth,1),i.ty=n.clientY/Math.max(window.innerHeight,1),i.active=!0)},{passive:!0}),document.addEventListener(\"pointerleave\",()=>{i.tx=.5,i.ty=.35}),document.addEventListener(\"visibilitychange\",()=>{document.hidden?P():d.matches||E()});const C=window.matchMedia(\"(prefers-color-scheme: dark)\");typeof C.addEventListener==\"function\"&&C.addEventListener(\"change\",()=>{S(),d.matches&&m(0)}),typeof d.addEventListener==\"function\"&&d.addEventListener(\"change\",()=>{P(),d.matches?m(0):E()}),S(),A(),d.matches?m(0):E()}"],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/WorkDetail.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\".lightbox\"),o=e?.querySelector(\"img\");document.querySelectorAll(\"[data-zoom]\").forEach(t=>{t.addEventListener(\"click\",()=>{!e||!o||(o.src=t.dataset.zoom??\"\",o.alt=t.querySelector(\"img\")?.getAttribute(\"alt\")??\"\",e.showModal())})});e?.addEventListener(\"click\",t=>{t.target===e&&e.close()});"],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/components/Works.astro?astro&type=script&index=0&lang.ts","const r=document.querySelector(\".filters\");if(r){const a=Array.from(r.querySelectorAll(\".filter\")),c=Array.from(document.querySelectorAll(\".works .card\"));r.addEventListener(\"click\",l=>{const e=l.target.closest(\".filter\");if(!e)return;const s=e.dataset.filter??\"all\";a.forEach(t=>{const o=t===e;t.classList.toggle(\"is-active\",o),t.setAttribute(\"aria-pressed\",String(o))}),c.forEach(t=>{t.hidden=s!==\"all\"&&t.dataset.category!==s})})}"],["/Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","const c=document.documentElement,o=document.querySelector(\".theme-toggle\");o&&o.addEventListener(\"click\",()=>{const t=c.getAttribute(\"data-theme\"),e=(t?t===\"dark\":window.matchMedia(\"(prefers-color-scheme: dark)\").matches)?\"light\":\"dark\";c.setAttribute(\"data-theme\",e);try{localStorage.setItem(\"theme\",e)}catch{}});"]],"assets":["/file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/en/writing/feed.xml","/file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/en/writing/index.html","/file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/en/index.html","/file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/robots.txt","/file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/sitemap.xml","/file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/writing/feed.xml","/file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/writing/index.html","/file:///Users/austin/WorkBuddy/2026-10-24-13-06-08/whoami-site/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"gabKO9FfHxt3aMFNykUH9w0Ho/cron/hr8dXJ2W5KIo="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
