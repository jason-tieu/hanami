/**
 * Institution registry for Canvas LMS integrations
 * Maps university keys to their Canvas base URLs
 */

export interface Institution {
  key: string;
  label: string;
  baseUrl: string;
}

export const INSTITUTIONS: Institution[] = [
  {
    key: 'qut',
    label: 'Queensland University of Technology (QUT)',
    baseUrl: 'https://canvas.qut.edu.au'
  }
];

export const getInstitutionByKey = (key: string): Institution | undefined => {
  return INSTITUTIONS.find(inst => inst.key === key);
};

export const getInstitutionByBaseUrl = (baseUrl: string): Institution | undefined => {
  return INSTITUTIONS.find(inst => inst.baseUrl === baseUrl);
};

// Whitelist of allowed Canvas hosts for security
export const ALLOWED_CANVAS_HOSTS = INSTITUTIONS.map(inst => inst.baseUrl);

export const isAllowedCanvasHost = (baseUrl: string): boolean => {
  return ALLOWED_CANVAS_HOSTS.includes(baseUrl);
};
