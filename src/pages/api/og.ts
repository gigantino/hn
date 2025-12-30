import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Hacker News";
  const author = url.searchParams.get("author") || "";
  const score = url.searchParams.get("score") || "";
  const comments = url.searchParams.get("comments") || "";

  // Load Inter font with regular and black weights
  const [interRegular, interBlack] = await Promise.all([
    fetch("https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff").then(
      (res) => res.arrayBuffer()
    ),
    fetch("https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYAZ9hjp-Ek-_EeA.woff").then(
      (res) => res.arrayBuffer()
    ),
  ]);

  const html = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000000", // black
        padding: "60px",
        border: "1px solid rgba(115, 115, 115, 0.4)", // neutral-500/40
        fontFamily: "Inter",
        position: "relative",
      },
      children: [
        // Header with [HN] branding
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              position: "absolute",
              top: "60px",
              left: "60px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "white",
                    fontSize: "36px",
                    fontWeight: 900,
                  },
                  children: "[HN]",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: "#a3a3a3",
                    fontSize: "20px",
                  },
                  children: "A modern yet lightweight front-end for HackerNews",
                },
              },
            ],
          },
        },
        // Main content
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            },
            children: [
              // Title
              {
                type: "div",
                props: {
                  style: {
                    fontSize: title.length > 60 ? "44px" : "56px",
                    fontWeight: "bold",
                    color: "white",
                    lineHeight: 1.3,
                    marginBottom: "32px",
                  },
                  children: title,
                },
              },
              // Metadata row
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                    fontSize: "24px",
                  },
                  children: [
                    author && {
                      type: "span",
                      props: {
                        style: {
                          color: "#60a5fa", // blue-400
                        },
                        children: author,
                      },
                    },
                    score && {
                      type: "span",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#a3a3a3", // neutral-400
                        },
                        children: [
                          {
                            type: "svg",
                            props: {
                              width: "20",
                              height: "20",
                              viewBox: "0 0 24 24",
                              fill: "currentColor",
                              children: {
                                type: "path",
                                props: {
                                  d: "M12 4L3 15h18L12 4z",
                                },
                              },
                            },
                          },
                          {
                            type: "span",
                            props: {
                              children: score,
                            },
                          },
                        ],
                      },
                    },
                    comments && {
                      type: "span",
                      props: {
                        style: {
                          color: "#a3a3a3", // neutral-400
                        },
                        children: `${comments} comments`,
                      },
                    },
                  ].filter(Boolean),
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: interRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: interBlack,
        weight: 900,
        style: "normal",
      },
    ],
  });
};
