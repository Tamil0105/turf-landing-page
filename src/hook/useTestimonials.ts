import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type Testimonial = {
  id: number;
  authorName: string;
  content: string;
  rating: number;
  createdAt: Date;
  fileType: "image" | "video" | "youtube" | "instagram";
  mediaUrl: string;
};
// Define the API URL base for testimonials (adjust if needed)
const API_URL = "https://api-gms.vercel.app/api/v1/testimonials";

export function useTestimonials() {
  const queryClient = useQueryClient();

  // Fetch all testimonials
  const getAllTestimonials = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        return response.data as Testimonial[];
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        throw error;
      }
    },
    refetchInterval: false, // Disable refetching
    staleTime: 600000, // Testimonials will stay fresh for 10 minutes
  });

  return {
    getAllTestimonials,
    queryClient,
  };
}
