import EmptyState from "../components/common/EmptyState";
import FeaturedProperties from "../components/FeaturedProperties";
import HowItWorks from "../components/HowItWorks";
import AboutUs from "../components/AboutUs";
import HeroSection from "../components/HeroSection";
import BrowseByLocation from "../components/home/BrowseByLocation";
import TrustBand from "../components/home/TrustBand";
import OrganizationJsonLd from "../components/seo/OrganizationJsonLd";
import HomeCatalogSkeleton from "../components/common/HomeCatalogSkeleton";
import { usePropertiesStatus, usePropertyCatalog } from "../context/PropertiesContext";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  getFeaturedListings,
  getPopularLocations,
} from "../data/homepage";

function HomeCatalogSections({ properties }) {
  const featured = getFeaturedListings(properties);
  const locations = getPopularLocations(properties);

  return (
    <>
      <BrowseByLocation locations={locations} />
      <FeaturedProperties properties={featured} />
    </>
  );
}

function Home() {
  usePageMeta({
    title: "Verified land marketplace",
    description:
      "Discover verified land listings across Nigeria. Licensed agents, transparent documents, and free inspection booking on SellingPoint.",
    path: "/",
  });

  const { loadState, reload } = usePropertiesStatus();
  const properties = usePropertyCatalog();

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationJsonLd />
      <HeroSection />

      {loadState === "loading" && <HomeCatalogSkeleton />}

      {loadState === "error" && (
        <section className="section-padding bg-white">
          <div className="page-container max-w-lg">
            <EmptyState
              icon="lucide:cloud-off"
              title="Could not load listings"
              description="Featured properties and location browse are temporarily unavailable. The rest of the site still works."
              actionLabel="Try again"
              onAction={reload}
            />
          </div>
        </section>
      )}

      {loadState === "success" && <HomeCatalogSections properties={properties} />}

      <HowItWorks />
      <TrustBand />
      <AboutUs />
    </div>
  );
}

export default Home;
