"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAuthStore from "@/store/Auth/authStore";
import Profile from "@/features/Profile/Profile";

const UserProfilePage = () => {
  const { userId } = useParams();

  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
        setLoading(false);
      } catch (error) {
        setError(`Failed to authenticate user: ${error}`);
        setLoading(false);
      }
    };

    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated && user && userId && !loading && user.id !== userId) {
      router.push(`/profile/${user.id}`);
    }
  }, [isAuthenticated, user?.id, userId, loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => router.push("/")}>Return to Home</button>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="profile-page-container">
      <Profile user={user} />
    </div>
  );
};

export default UserProfilePage;
