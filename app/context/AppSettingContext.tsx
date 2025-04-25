import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppSettingMutation } from '../redux/service/AppSettingsService';

interface AppSettingsType {
  Message?: {
    Flash_Logo?: string;
    Client_Logo?: string;
    Labels?: Record<string, { defaultMessage: string }>;
    Password_Policy_Message?: string[];
    Languages?: {
      Code: string;
      Description: string;
      Alignment: string;
      Labels_Url: string;
    }[];
    Mobile_App_Default_Language?: string;
    Default_Currency?: string;
  }[];
  [key: string]: any;
}

interface AppSettingsContextType {
  settings: AppSettingsType | null;
  loading: boolean;
  error: string | null;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};

export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appSettingsAPIReq] = useAppSettingMutation();

  useEffect(() => {
    const fetchAppSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await appSettingsAPIReq({}).unwrap();
        setSettings(result);
        console.log('✅ App Settings fetched:', result);
      } catch (err) {
        console.error('❌ Failed to fetch app settings:', err);
        setError('Failed to fetch app settings');
      } finally {
        setLoading(false);
      }
    };

    fetchAppSettings();
  }, [appSettingsAPIReq]);

  return (
    <AppSettingsContext.Provider value={{ settings, loading, error }}>
      {children}
    </AppSettingsContext.Provider>
  );
};
