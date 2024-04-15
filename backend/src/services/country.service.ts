import { ILike, DeleteResult } from "typeorm"; // Ilike n'est pas sensible à la casse contrairement à Like.
import { Country } from "../entities/country";

export function findCountryById(id: number): Promise<Country | null> {
  return Country.findOne({
    where: { id: id },
  });
}

export async function getAllCountries(): Promise<Country[]> {
  const allCountry = await Country.find();
  if (allCountry.length === 0) {
    throw new Error("Aucune pays dans la base de donnée");
  } else {
    return allCountry;
  }
}

/**
 * Récupère les pays en fonction des termes de recherche fournis.
 * @param code - Les termes de recherche pour filtrer les pays.
 * @returns Une promesse résolue avec un tableau de pays correspondant aux termes de recherche.
 * @throws Une erreur si une erreur survient pendant la recherche ou si aucune catégorie n'est trouvée.
 */
export async function getCountriesByCode(code: string = ''): Promise<Country[]> {
  try {
    // Vérifier si des termes de recherche sont fournis
    const country = code
      ? await Country.find({ where: { code: ILike(`%${code}%`) } })
      : await Country.find();

    // Vérifier si des pays ont été trouvées
    if (country.length > 0) {
      return country;
    } else {
      throw new Error("Aucune pays trouvée.");
    }
  } catch (error) {
    // Gérer les erreurs qui pourraient survenir pendant la recherche
    throw new Error(error instanceof Error ? error.message : "Une erreur inattendue s'est produite.");
  }
}

export async function getCountriesByContinentCode(continentCode: string = ''): Promise<Country[]> {
  try {
    // Vérifier si des termes de recherche sont fournis
    const country = continentCode
      ? await Country.find({ where: { continentCode: ILike(`%${continentCode}%`) } })
      : await Country.find();

    // Vérifier si des pays ont été trouvées
    if (country.length > 0) {
      return country;
    } else {
      throw new Error(`Aucune pays trouvée pour le code de continent : ${continentCode}.`);
    }
  } catch (error) {
    // Gérer les erreurs qui pourraient survenir pendant la recherche
    throw new Error(error instanceof Error ? error.message : "Une erreur inattendue s'est produite.");
  }
}


export async function create(countryData: {
  name: string;
  emoji: string;
  code: string;
  continentCode: string;
}): Promise<String | Country> {
  // Vérifier si le pays existe déjà
  const existingCountry = await Country.findOne({ where: { name: countryData.name } });

  // Si le pays existe, renvoyer un message d'erreur
  if (existingCountry) {
    throw new Error('Le pays existe déjà.');
  }

  // Si le pays n'existe pas, créer une nouvelle catégorie
  const country = new Country();
  country.name = countryData.name;
  country.emoji = countryData.emoji;
  country.code = countryData.code;
  country.continentCode = countryData.continentCode;

  return await country.save();
}

export async function updateCountry(
  id: number,
  Country: Country
): Promise<Country | undefined> {
  const countryToUpdate = await findCountryById(id);

  if (!countryToUpdate) {
    throw new Error("Pays non trouvée");
  }

  if (countryToUpdate) {
    countryToUpdate.name = Country.name;
    countryToUpdate.emoji = Country.emoji;

    return countryToUpdate.save();
  }
}

export interface DeleteCountryResult {
  isSuccess: boolean;
  message?: string;
}

export async function deleteCountry(id: number): Promise<DeleteCountryResult> {
  try {
    const countryToDelete = await Country.delete(id);

    if (!countryToDelete) {
      return { isSuccess: false, message: `Le pays avec l'id ${id} n'existe pas.` }
    }

    const result: DeleteResult = await Country.delete({ id: id });

    return { isSuccess: true, message: "Le pays a été supprimée avec succès." }
  } catch (error) {
    return { isSuccess: false, message: "Une erreur inattendue s'est produite." }
  }
}