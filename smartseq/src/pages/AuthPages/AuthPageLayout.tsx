import React from "react";
import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-2xl px-8">
              <h1 className="mb-6 text-3xl font-bold text-center text-white">
                Bienvenue sur votre Espace Scolaire Connecté
              </h1>
              <p className="mb-4 text-lg  text-gray-200">
                Gérez votre établissement, vos cours, vos élèves et vos finances en toute simplicité.
              </p>
              <p className="mb-8 text-base  text-gray-300">
                Notre plateforme moderne et sécurisée vous permet de suivre, en temps réel, toute la vie scolaire de votre établissement. Que vous soyez enseignant, parent, administrateur, élève ou personnel scolaire, vous disposez d'un espace dédié, intuitif et adapté à vos besoins.
              </p>
              <div className="grid grid-cols-1 gap-4 text-sm text-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Suivi des notes, absences et bulletins</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Paiements et reçus en ligne</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Emplois du temps clairs et à jour</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Messagerie interne sécurisée</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Ressources pédagogiques disponibles 24h/24</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Statistiques et rapports en un clic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
