import { z } from "zod";
import {
  addPestFormSchema,
  contactFormSchema,
  addDiseaseFormSchema,
  editPestFormSchema,
  registerSupplierFormSchema,
  addProductFormSchema,
  editProductFormSchema,
} from "./schemas";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Product, Role, Scan, ScanType, Supplier, User } from "@prisma/client";

export type ContactForm = z.infer<typeof contactFormSchema>;

export type AddPestForm = z.infer<typeof addPestFormSchema>;

export type AddDiseaseForm = z.infer<typeof addDiseaseFormSchema>;

export type EditPestForm = z.infer<typeof editPestFormSchema>;

export type RegisterSupplierForm = z.infer<typeof registerSupplierFormSchema>;

export type AddProductForm = z.infer<typeof addProductFormSchema>;

export type EditProductForm = z.infer<typeof editProductFormSchema>;

export type TFeatureItem =
  | {
      title: string;
      description: string;
      icon: IconProp;
      alt?: undefined;
      src?: undefined;
    }
  | {
      title: string;
      description: string;
      src: string;
      alt: string;
      icon?: undefined;
    };

export type TScanData =
  | ({
      scan: {
        id: string;
        description: string | null;
        url: string;
        createdAt: Date;
        customerId: string;
        type: ScanType;
        name: string;
      }[];
    } & {
      id: string;
    })
  | null;

export type ExpandedDescriptions = {
  [key: string]: boolean;
};

export type ResourceNames = {
  name: string;
}[];

export enum ResourceType {
  PEST = "Pest",
  DISEASE = "Disease",
}

export type ProductWithSuppliers = {
  country: string;
  description: string;
  id: string;
  region: string;
  product: {
    id: string;
    name: string;
  };
  supplier: {
    name: string;
    id: string;
  };
  city: string;
  price: number;
  images: string[];
};

type Currency = {
  name: string;
  code: string;
  symbol: string;
};

type TimeZone = {
  name: string;
  offset: number;
  current_time: string;
  current_time_unix: string;
  is_dst: string;
  dst_savings: number;
};

export type IpInfo = {
  ip: string;
  hostname: string;
  continent_code: string;
  continent_name: string;
  country_code2: string;
  country_code3: string;
  country_name: string;
  country_capital: string;
  state_prov: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  is_eu: string;
  calling_code: string;
  country_tld: string;
  languages: string;
  country_flag: string;
  isp: string;
  connection_type: string;
  organization: string;
  asn: string;
  geoname_id: number;
  currency: Currency;
  time_zone: TimeZone;
};

export type CustomerScan = {
  id: string;
  role: Role | null;
  image: string | null;
  name: string | null;
  totalScans: number;
  updatedAt: Date;
  createdAt: Date;
  userName: string | null;
  userEmail: string | null;
};

export type TLocation = {
  id: string;
  countryCode: string;
  currencySymbol: string;
  city: string;
  country: string;
  region: string;
};

 type LocationInfo = {
  name: string;
  description?: string;
  isoName?: string;
  order: number;
  adminLevel?: number;
  isoCode?: string;
  wikidataId?: string;
  geonameId?: number;
};

type LocalityInfo = {
  administrative: LocationInfo[];
  informative: LocationInfo[];
};

export type GeolocationData = {
  latitude: number;
  lookupSource: string;
  longitude: number;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  localityInfo: LocalityInfo;
};
