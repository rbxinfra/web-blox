import { maintenanceIllustrationPath } from "@modules/constants/assetConstants"

const MaintenanceMetaHeadLayout: React.FC = () => {
  return (
    <>
      <title>Maintenance - Web Blox Test App</title>

      {/* All meta tags for embeds on sites like discord, X etc. */}
      <meta name="description" content="Maintenance page for Web Blox Test App" />
      <meta property="og:title" content="Web Blox Test App - Maintenance" />
      <meta property="og:description" content="Maintenance page for Web Blox Test App" />
      <meta property="og:image" content={maintenanceIllustrationPath} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Web Blox Test App - Maintenance" />
      <meta name="twitter:description" content="Maintenance page for Web Blox Test App" />
      <meta name="twitter:image" content={maintenanceIllustrationPath} />
      <meta name="twitter:image:alt" content="Maintenance page for Web Blox Test App" />
      <meta name="twitter:site" content="@webblox" />
    </>
  )
}

export default MaintenanceMetaHeadLayout;