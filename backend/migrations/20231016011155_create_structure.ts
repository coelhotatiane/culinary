import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE public.category_ph (
      id bigserial NOT NULL,
      "name" varchar NULL,
      CONSTRAINT category_ph_pk PRIMARY KEY (id)
    );
  `);

  await knex.raw(`
CREATE TABLE public.peter_aromas (
	id smallserial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT peter_aromas_pkey PRIMARY KEY (id)
);
  `);

  await knex.raw(`
  CREATE TABLE public.peter_descriptors (
    id smallserial NOT NULL,
    "name" varchar NULL,
    CONSTRAINT peter_descriptors_pk PRIMARY KEY (id)
  );
  CREATE INDEX peter_descriptors_id_idx ON public.peter_descriptors USING btree (id);`);

  await knex.raw(`
CREATE TABLE public.peter_taste_relation_impacts (
	id smallserial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT peter_taste_relation_impacts_pk PRIMARY KEY (id)
);`);

  await knex.raw(`
  CREATE TABLE public.peter_tastes (
    id smallserial NOT NULL,
    "name" varchar NOT NULL,
    CONSTRAINT peter_tastes_pk PRIMARY KEY (id)
  )`);

  await knex.raw(`CREATE TABLE public.aroma_type_descriptor_relations (
      id smallserial NOT NULL,
      "type" int8 NULL,
      "descriptor" int8 NULL
    );
    -- public.aroma_type_descriptor_relations foreign keys
    ALTER TABLE public.aroma_type_descriptor_relations ADD CONSTRAINT aroma_type_descriptor_relations_fk FOREIGN KEY ("type") REFERENCES public.peter_aromas(id);
    ALTER TABLE public.aroma_type_descriptor_relations ADD CONSTRAINT aroma_type_descriptor_relations_fk_1 FOREIGN KEY ("descriptor") REFERENCES public.peter_descriptors(id)`);

  await knex.raw(`
    CREATE TABLE public.ingredients (
      id bigserial NOT NULL,
      "name" varchar NOT NULL,
      ph numeric NULL,
      peter_aroma int2 NULL,
      peter_taste int2 NULL,
      CONSTRAINT ingredients_pkey PRIMARY KEY (id)
    );
    -- public.ingredients foreign keys
    ALTER TABLE public.ingredients ADD CONSTRAINT ingredients_fk FOREIGN KEY (peter_aroma) REFERENCES public.peter_aromas(id);
    ALTER TABLE public.ingredients ADD CONSTRAINT ingredients_fk_1 FOREIGN KEY (peter_taste) REFERENCES public.peter_tastes(id);`);

  await knex.raw(`
CREATE TABLE public.peter_taste_relations (
	"from" int2 NOT NULL,
	"to" int2 NOT NULL,
	impact int2 NOT NULL
);


-- public.peter_taste_relations foreign keys

ALTER TABLE public.peter_taste_relations ADD CONSTRAINT peter_taste_relations_fk FOREIGN KEY ("from") REFERENCES public.peter_tastes(id);
ALTER TABLE public.peter_taste_relations ADD CONSTRAINT peter_taste_relations_fk_1 FOREIGN KEY ("to") REFERENCES public.peter_tastes(id);
ALTER TABLE public.peter_taste_relations ADD CONSTRAINT peter_taste_relations_fk_2 FOREIGN KEY (impact) REFERENCES public.peter_taste_relation_impacts(id);`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE public.peter_taste_relations`);
  await knex.raw(`DROP TABLE public.aroma_type_descriptor_relations`);
  await knex.raw(`TABLE public.ingredients`);
  await knex.raw(`DROP TABLE public.peter_tastes`);
  await knex.raw(`DROP TABLE public.peter_taste_relation_impacts`);
  await knex.raw(`DROP TABLE public.peter_descriptors`);
  await knex.raw(`DROP TABLE public.peter_aromas`);
  await knex.raw(`DROP TABLE public.category_ph`);
}
