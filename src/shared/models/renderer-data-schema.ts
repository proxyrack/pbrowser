import { DefaultValues } from 'react-hook-form';
import { z } from 'zod';

export const generalSettingsSchema = z.object({
  name: z
    .string()
    .nonempty('The profile name is required.')
    .max(64)
    .regex(
      /^[\w\-\s()]+$/,
      'Only the Latin alphabet letters, numbers and the following special characters allowed: ( ) _ -'
    ),
  description: z.string().max(1000),
  os: z.enum(['macos'], { invalid_type_error: 'Please select an operating system.' }),
  browser: z.enum(['chrome'], { invalid_type_error: 'Please select a browser profile.' }),
  fillBasedOnExternalIp: z.boolean(),
});

export type GeneralSettings = z.infer<typeof generalSettingsSchema>;

export const generalSettingsDefaults: DefaultValues<GeneralSettings> = {
  name: '',
  fillBasedOnExternalIp: true,
};

export type ManageBrowserProfileDto = {
  id: string | null;
  general: GeneralSettings;
};
