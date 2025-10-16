interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Temporairement désactivé - accès libre à toutes les pages
  return <>{children}</>;
  
  // Code original (à réactiver plus tard pour la connexion obligatoire)
  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) {
  //   return <Navigate to="/signin" replace />;
  // }
  // return <>{children}</>;
} 