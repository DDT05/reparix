import React from 'react'
import { Database, AlertCircle, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'

export const SupabaseConnectionWidget = () => {
  const handleConnectToSupabase = () => {
    // This will trigger Bolt's Supabase connection flow
    window.open('https://bolt.new/setup/supabase', '_blank')
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Connexion Supabase requise
          </h3>
          <p className="text-yellow-700 mb-4">
            Pour que les inscriptions à la newsletter fonctionnent, vous devez connecter ce projet à Supabase 
            et configurer la table "Reparix".
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleConnectToSupabase}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <Database className="w-4 h-4 mr-2" />
              Connecter à Supabase
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="mt-4 text-sm text-yellow-600">
            <p className="font-medium mb-2">Après la connexion, assurez-vous que :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>La table "Reparix" existe dans votre base de données</li>
              <li>Les politiques RLS permettent l'insertion anonyme</li>
              <li>La table a les colonnes : id, email, created_at</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}