'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// 1. Définir le schéma de validation avec Yup
const schema = Yup.object().shape({
  nom: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('Email invalide').required("L'email est requis"),
  age: Yup.number()
    .typeError("L'âge doit être un nombre")
    .positive("L'âge doit être positif")
    .integer("L'âge doit être un entier")
    .required("L'âge est requis"),
});

export default function FormulairePage() {
  // 2. Initialiser le formulaire avec le resolver Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // 👈 Ajout de reset ici
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 3. Fonction de soumission
  const onSubmit = (data) => {
    console.log('Données soumises :', data);
    alert('Formulaire soumis avec succès !');
    reset(); // 👈 Vide le formulaire après soumission
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formulaire</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Nom</label>
          <input
            type="text"
            {...register('nom')}
            className="border p-2 w-full"
          />
          <p className="text-red-500 text-sm">{errors.nom?.message}</p>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email')}
            className="border p-2 w-full"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <label>Âge</label>
          <input
            type="number"
            {...register('age')}
            className="border p-2 w-full"
          />
          <p className="text-red-500 text-sm">{errors.age?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

