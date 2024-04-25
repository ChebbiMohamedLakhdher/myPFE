"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("af46faba-6c50-4e54-a912-6bec071083bc");
  });

  return null;
}

export default CrispChat;