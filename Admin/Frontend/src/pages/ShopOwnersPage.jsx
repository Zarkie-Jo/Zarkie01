import { useState, useEffect } from "react";
import axios from "axios";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import ShopOwner from "../components/ShopOwner/ShopOwner";

const ShopOwnersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 ">
      <div dir="rtl">
        <Header title="إضافة عضو جديد" />
      </div>
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <ShopOwner />
      </main>
    </div>
  );
};

export default ShopOwnersPage;
