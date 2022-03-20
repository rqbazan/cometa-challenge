export interface Guardian {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  tax_id: string
}

export interface School {
  id: string
  name: string
  logo: string
  country: string
  city: string
  address: string
  zip_code: string
}

export interface RootObject {
  id: string
  first_name: string
  last_name: string
  guardian: Guardian
  cohort: string
  school: School
  monthly_grant_type?: any
  monthly_grant_value?: any
  inscription_grant_value?: any
  inscription_grant_type?: any
}
