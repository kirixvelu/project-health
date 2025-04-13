// <!-- Minimal Analytics V1.10 via https://dariusz.wieckiewicz.org/en/minimal-google-analytics-4-snippet/-->

(enScroll = !1),
  (enFdl = !1),
  (extCurrent = void 0),
  (filename = void 0),
  (targetText = void 0),
  (splitOrigin = void 0);
const lStor = localStorage,
  sStor = sessionStorage,
  doc = document,
  docEl = document.documentElement,
  docBody = document.body,
  docLoc = document.location,
  w = window,
  s = screen,
  nav = navigator || {},
  extensions = [
    "pdf",
    "xls",
    "xlsx",
    "doc",
    "docx",
    "txt",
    "rtf",
    "csv",
    "exe",
    "key",
    "pps",
    "ppt",
    "pptx",
    "7z",
    "pkg",
    "rar",
    "gz",
    "zip",
    "avi",
    "mov",
    "mp4",
    "mpe",
    "mpeg",
    "wmv",
    "mid",
    "midi",
    "mp3",
    "wav",
    "wma",
  ];
function a(e, t, n, o) {
  const j = "G-DTCC1LSPT5",
    r = () => Math.floor(Math.random() * 1e9) + 1,
    c = () => Math.floor(Date.now() / 1e3),
    F = () => (sStor._p || (sStor._p = r()), sStor._p),
    E = () => r() + "." + c(),
    _ = () => (lStor.cid_v4 || (lStor.cid_v4 = E()), lStor.cid_v4),
    m = lStor.getItem("cid_v4"),
    v = () => (m ? void 0 : enScroll == !0 ? void 0 : "1"),
    p = () => (sStor.sid || (sStor.sid = c()), sStor.sid),
    O = () => {
      if (!sStor._ss) return (sStor._ss = "1"), sStor._ss;
      if (sStor.getItem("_ss") == "1") return void 0;
    },
    a = "1",
    g = () => {
      if (sStor.sct)
        if (enScroll == !0) return sStor.sct;
        else (x = +sStor.getItem("sct") + +a), (sStor.sct = x);
      else sStor.sct = a;
      return sStor.sct;
    },
    i = docLoc.search,
    b = new URLSearchParams(i),
    h = ["q", "s", "search", "query", "keyword"],
    y = h.some((e) => i.includes("&" + e + "=") || i.includes("?" + e + "=")),
    u = () =>
      y == !0
        ? "view_search_results"
        : enScroll == !0
        ? "scroll"
        : enFdl == !0
        ? "file_download"
        : "page_view",
    f = () => (enScroll == !0 ? "90" : void 0),
    C = () => {
      if (u() == "view_search_results") {
        for (let e of b) if (h.includes(e[0])) return e[1];
      } else return void 0;
    },
    d = encodeURIComponent,
    k = (e) => {
      let t = [];
      for (let n in e)
        e.hasOwnProperty(n) && e[n] !== void 0 && t.push(d(n) + "=" + d(e[n]));
      return t.join("&");
    },
    A = !1,
    S = "https://www.google-analytics.com/g/collect",
    M = k({
      v: "2",
      tid: j,
      _p: F(),
      sr: (
        s.width * w.devicePixelRatio +
        "x" +
        s.height * w.devicePixelRatio
      ).toString(),
      ul: (nav.language || void 0).toLowerCase(),
      cid: _(),
      _fv: v(),
      _s: "1",
      dl: docLoc.origin + docLoc.pathname + i,
      dt: doc.title || void 0,
      dr: doc.referrer || void 0,
      sid: p(),
      sct: g(),
      seg: "1",
      en: u(),
      "epn.percent_scrolled": f(),
      "ep.search_term": C(),
      "ep.file_extension": e || void 0,
      "ep.file_name": t || void 0,
      "ep.link_text": n || void 0,
      "ep.link_url": o || void 0,
      _ss: O(),
      _dbg: A ? 1 : void 0,
    }),
    l = S + "?" + M;
  if (nav.sendBeacon) nav.sendBeacon(l);
  else {
    let e = new XMLHttpRequest();
    e.open("POST", l, !0);
  }
}
a();
function sPr() {
  return (
    ((docEl.scrollTop || docBody.scrollTop) /
      ((docEl.scrollHeight || docBody.scrollHeight) - docEl.clientHeight)) *
    100
  );
}
doc.addEventListener("scroll", sEv, { passive: !0 });
function sEv() {
  const e = sPr();
  if (e < 90) return;
  (enScroll = !0),
    a(),
    doc.removeEventListener("scroll", sEv, { passive: !0 }),
    (enScroll = !1);
}
document.addEventListener("DOMContentLoaded", function () {
  let e = document.getElementsByTagName("a");
  for (let t = 0; t < e.length; t++)
    if (e[t].getAttribute("href") != null) {
      const n = e[t].getAttribute("href"),
        s = n.substring(n.lastIndexOf("/") + 1),
        o = s.split(".").pop();
      (e[t].hasAttribute("download") || extensions.includes(o)) &&
        e[t].addEventListener("click", fDl, { passive: !0 });
    }
});
function fDl(e) {
  enFdl = !0;
  const t = e.currentTarget.getAttribute("href"),
    n = t.substring(t.lastIndexOf("/") + 1),
    s = n.split(".").pop(),
    o = n.replace("." + s, ""),
    i = e.currentTarget.text,
    r = t.replace(docLoc.origin, "");
  a(s, o, i, r), (enFdl = !1);
}
