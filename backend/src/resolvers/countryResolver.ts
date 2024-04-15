import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/country";
import * as CountryService from "../services/country.service";
import { CreateCountryInputType } from "../types/country/CreateCountryInputType";
import { UpdateCountryInputType } from "../types/country/UpdateCountryInputType";
import { DeleteCountryResult } from "../services/country.service";

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await CountryService.getAllCountries();
  }

  @Query(() => [Country])
  async searchCountriesByCode(@Arg("code", { nullable: true }) code: string): Promise<Country[]> {
    try {
      return await CountryService.getCountriesByCode(code);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); // Renvoyer l'erreur en tant que chaîne
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }

  @Query(() => [Country])
  async searchCountriesByContinentCode(@Arg("continentCode", { nullable: true }) continentCode: string): Promise<Country[]> {
    try {
      return await CountryService.getCountriesByContinentCode(continentCode);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); // Renvoyer l'erreur en tant que chaîne
      } else {
        throw new Error("Une erreur inattendue s'est produite.");
      }
    }
  }

  @Mutation(() => Country)
  createCountry(@Arg("country") country: CreateCountryInputType): Promise<Country | String> {
    return CountryService.create({ ...country});
  }

  @Mutation(() => Country)
  updateCountry(@Arg("Country") Country: UpdateCountryInputType): Promise<Country | undefined> {
    return CountryService.updateCountry(Country.id, {...Country} as unknown as Country)
  }

  @Mutation(() => String)
  async deleteCountry(@Arg("id") id: number): Promise<string | undefined> {
    const result: DeleteCountryResult = await CountryService.deleteCountry(id);
    return result.message;
  }
}