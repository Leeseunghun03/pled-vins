# PLED-VINS project page

Static page for "PLED-VINS: A Point-Line Event-Based Visual Inertial SLAM for
Dynamic Environments" (IROS 2026). No build step. Open `index.html` directly,
or serve the folder with GitHub Pages (Settings > Pages > Deploy from branch,
`main`, `/ (root)`).

- Figures in `static/images/` are rendered from the arXiv source PDFs with the
  same LaTeX trims as the paper.
- `static/videos/demo_*.mp4` are muted clips cut from the YouTube video
  (VIODE 0:33.95-0:53.40, DAVIS 240C 0:57.80-1:15.85).
- `static/images/scoremap/` holds the original JPEG panels embedded in the
  Fig. 4 PDF (score map viewer).
- Preview locally with `python3 -m http.server` (YouTube embeds fail when
  the file is opened directly).
- `static/images/ate_high.jpg` is Fig. 7 re-plotted at the results frame aspect by
  `~/Papers/IROS_2026/tools/box_plot_web.py` (same data and ATE code as
  `tools/box_plot.py`, figsize 6.0x3.2, sequence label typo fixed, baselines muted and ours
  emphasized, light grid), then
  resized to 1600 px wide.
- When the IEEE Xplore DOI is out, uncomment the IEEE Xplore button in
  `index.html` and add `doi` to the BibTeX.
