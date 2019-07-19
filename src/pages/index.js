import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Vse objave" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const imageUrl =
            node.frontmatter.defaultImage &&
            node.frontmatter.defaultImage.childImageSharp

          return (
            <div key={node.fields.slug}>
              <Link
                style={{
                  boxShadow: `none`,
                  display: "flex",
                  marginBottom: "1em",
                }}
                to={node.fields.slug}
              >
                {imageUrl && (
                  <Img style={{ minWidth: "125px" }} fixed={imageUrl.fixed} />
                )}
                <div style={{ marginLeft: "1em" }}>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                      marginTop: 0,
                    }}
                  >
                    {title}
                  </h3>
                  <small style={{ color: "#000" }}>
                    {node.frontmatter.date}
                  </small>
                  <p
                    style={{ color: "#000" }}
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </div>
              </Link>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            defaultImage {
              childImageSharp {
                fixed(width: 125, height: 125) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
