import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import UserModel from '@/lib/models/User';

export async function POST(request) {
  const body = await request.json();

  // Validation des champs
  if (!body.name || !body.email || !body.password || !body.confirmPassword) {
    return NextResponse.json({ success: false, message: "Veuillez remplir tous les champs." }, { status: 400 });
  }

  if (body.password !== body.confirmPassword) {
    return NextResponse.json({ success: false, message: "Les mots de passe ne correspondent pas." }, { status: 400 });
  }

  // Vérifier si l'email est valide
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'email
    return emailRegex.test(email);
  };

  if (!isValidEmail(body.email)) {
    return NextResponse.json(
      { success: false, message: "Veuillez entrer une adresse email valide." },
      { status: 400 }
    );
  }

  // Vérifier si l'email est déjà utilisé
  const existingUser = await UserModel.findOne({ email: body.email });
  if (existingUser) {
    return NextResponse.json({ success: false, message: "Cet email est déjà utilisé." }, { status: 400 });
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Créer un nouvel utilisateur
  const newUser = new UserModel({
    name: body.name,
    email: body.email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json({ success: true, message: "Inscription réussie." }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Une erreur s'est produite lors de l'inscription." }, { status: 500 });
  }
}