import { Metadata } from "next";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { getServiceData } from "@/data/services";

const data = getServiceData("buyback", "commercial")!;

export const metadata: Metadata = {
  title: data.title,
  description: data.metaDescription,
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
