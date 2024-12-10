import axios from 'axios';

interface ApiConnectorProps {
  method: string;
  url: string;
  bodyData?: object;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

export const axiosInstance = axios.create({});

export const apiConnector = ({
  method,
  url,
  bodyData,
  headers,
  params,
}: ApiConnectorProps) => {
  return axiosInstance({
    method,
    url,
    data: bodyData || undefined,
    headers: headers || undefined,
    params: params || undefined,
  });
};
