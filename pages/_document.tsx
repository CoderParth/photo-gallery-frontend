/**
 * This file is used to customize the HTMLdocument that is served to the browser
 *
 * Here, we have added CssBaseline from material UI to provide a basline stylesheet and normalize the styles across different browsers
 *
 * ServerStyleSheets component from material-ui is used to collect the styles by the app during server rendering
 * This runs on initial load of the page
 */
import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheets } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <CssBaseline />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
