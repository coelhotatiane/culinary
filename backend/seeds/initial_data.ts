import { Knex } from 'knex';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function seed(knex: Knex): Promise<void> {
  const populate = async (tableName: string, dataFile: string) => {
    // Deletes ALL existing entries
    await knex(tableName).del();
    const igredientsPath = join(process.cwd(), 'seeds', dataFile);
    const data = JSON.parse(readFileSync(igredientsPath).toString())[tableName];
    // Inserts seed entries
    await knex(tableName).insert(data);
  };

  await populate('ingredients', 'ingredients_202310171918.json');
  await populate('category_ph', 'category_ph_202310171934.json');
  await populate('peter_aromas', 'peter_aromas_202310171935.json');
  await populate('peter_descriptors', 'peter_descriptors_202310171936.json');
  await populate('peter_tastes', 'peter_tastes_202310171936.json');
  await populate(
    'peter_taste_relation_impacts',
    'peter_taste_relation_impacts_202310171937.json',
  );
  await populate(
    'aroma_type_descriptor_relations',
    'aroma_type_descriptor_relations_202310171933.json',
  );
}
