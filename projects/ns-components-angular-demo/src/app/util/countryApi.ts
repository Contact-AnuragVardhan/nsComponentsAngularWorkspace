import { countries } from "./countries";

export interface Country {
    id: number;
    name: string;
    code: string;
};

const timeoutPeriod = 5000;

export const fetchAllCountries = (): Promise<Country[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let arrCountries: Country[] = [];
        countries.forEach((country, index) => {
            arrCountries.push({...country,id: index + 1});
        });
        resolve(arrCountries)
       }, timeoutPeriod);
    });
};

export const fetchCountriesWithText = (searchText: string): Promise<Country[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let arrCountries: Country[] = [];
        countries.forEach((country, index) => {
            if(country.name.includes(searchText) || country.code.includes(searchText)) {
                arrCountries.push({...country,id: index + 1});
            }
        });
        resolve(arrCountries)
       }, timeoutPeriod);
    });
};

