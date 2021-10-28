import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --color-1: #9B9A94;
        --color-2: #E0CBC4;
        --color-3: #EBE4DE;
        --color-4: #131310;
        --font-heading: 'Cormorant Garamond', serif;
        --font-body: 'Khula', sans-serif;
        --font-button: 'Cormorant Garamond', serif;
        --padding-page: 5vh 10vw;
    }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  } 
  
  body {
font-family: 'Khula', sans-serif;
font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
font-family: 'Cormorant Garamond', serif;
font-weight: 400;
}

.button {
font-family: 'Cormorant Garamond', serif;
font-weight: 700;
font-size: 13px;
text-transform: uppercase;
letter-spacing: 3px;
}
  `;
