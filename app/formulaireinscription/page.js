'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Schéma de validation
const schema = Yup.object().shape({
  nom: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('Email invalide').required("L'email est requis"),
  motdepasse: Yup.string().min(6, 'Min 6 caractères').required('Mot de passe requis'),
  confirmation: Yup.string()
    .oneOf([Yup.ref('motdepasse')], 'Les mots de passe ne correspondent pas')
    .required('Confirmez votre mot de passe'),
  conditions: Yup.boolean().oneOf([true], 'Vous devez accepter les conditions'),

  // Champs de réservation :
  datedebut: Yup.date().required('Date de début requise'),
  datefin: Yup.date()
    .required('Date de fin requise')
    .min(Yup.ref('datedebut'), 'La date de fin doit être après la date de début'),
});

export default function InscriptionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert('Inscription réussie !');
    console.log(data);
    reset();
  };


  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Formulaire d'inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Nom</label>
          <input type="text" {...register('nom')} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.nom?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email')} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" {...register('motdepasse')} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.motdepasse?.message}</p>
        </div>

        <div>
          <label>Confirmation du mot de passe</label>
          <input type="password" {...register('confirmation')} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.confirmation?.message}</p>
        </div>

        <div>
          <label>Date de début</label>
          <input type="date" {...register('datedebut')} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.datedebut?.message}</p>
        </div>

        <div>
          <label>Date de fin</label>
          <input type="date" {...register('datefin')} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.datefin?.message}</p>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('conditions')} />
          <label>J'accepte les conditions d'utilisation</label>
        </div>
        <p className="text-red-500 text-sm">{errors.conditions?.message}</p>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          S'inscrire
        </button>
      </form>
    </div>
  );
}
