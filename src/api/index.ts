import { request } from "./config";

export interface BodyType {
  source_code: string;
  language_id: number;
  stdin: string;
}

interface SubmissionResponse {
  token: string;
}

interface SubmissionResult {
  status_id: number;
  status: { description: string };
  stdout?: string;
  compile_output?: string;
  stderr?: string;
  [key: string]: unknown;
}


export const handleSubmit = async (data: BodyType): Promise<unknown> => {
  try {
    const response = await request.post<SubmissionResponse>(`?fields=*`, data);
    const res = await getSubmission(response.data.token);
    // const res = atob(result.stdout).replace(/ ["\n]/g, '');
    const status_name = res.status.description;
    const decoded_output = atob(res.stdout ? res.stdout : '');
    const decoded_compile_output = atob(res.compile_output ? res.compile_output : '');
    const decoded_error = atob(res.stderr ? res.stderr : '');

    let final_output = '';

    if (res.status_id !== 3) {
      // our code have some error
      if (decoded_compile_output === "") {
        final_output = decoded_error;
      }
      else {
        final_output = decoded_compile_output;
      }
    }
    else {
      final_output = decoded_output;
    }

    return { name: status_name, output: final_output }


  } catch (error) {

    if ((error as { message: string }).message.includes("exceeded the DAILY quota")) {
      return {
        name: 'DAILY_QUOTA LIMIT EXCEEDED',
        output: '',
      }
    }
    return { name: 'Something Went Wrong', output: '' }
  }
};

export const getSubmission = async (idToken: string): Promise<SubmissionResult> => {

  try {
    const response = await request.get<SubmissionResult>(`/${idToken}`);
    if (response.data.status_id === 2 || response.data.status_id === 1) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      return getSubmission(idToken);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching submission:', error);
    throw error;
  }
};