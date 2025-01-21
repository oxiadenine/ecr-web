"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "@/app/components/search-input.module.css";

export default function SearchInput({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  function onInputChnage(event) {
    setSearchTerm(event.target.value);
  }

  function onClearIconClick() {
    setSearchTerm("");
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm.length > 0) params.set("s", searchTerm);
    else params.delete("s");

    router.replace(`${pathname}?${params.toString()}`);
  }, [searchTerm]);

  return (
    <div className={styles["search-input"]}>
      <input 
        type="text" 
        placeholder={placeholder} 
        onChange={onInputChnage} 
        defaultValue={searchParams.get("s")?.toString()} 
        value={searchTerm}
      />
      {searchTerm.length > 0
        ? (
          <button type="button" onClick={onClearIconClick}>
            <i className="fa-solid fa-xmark" />
          </button>
        )
        : <i className="fa-solid fa-magnifying-glass" />}
    </div>
  );
}
