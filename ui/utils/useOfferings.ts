export type Offering = "cloud" | "community-edition" | "enterprise-edition";
import { useRouter } from "next/router";

export const useOffering = () => {
  const router = useRouter();
  const offering: Offering = (router.query.slug?.[0] as Offering) || "cloud";
  return {
    offering,
    setOffering: (o: Offering) =>
      router.push({
        pathname: router.pathname,
        query: { ...router.query, slug: [o] },
      }),
  };
};
