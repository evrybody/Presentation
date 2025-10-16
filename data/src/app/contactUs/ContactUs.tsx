"use client";

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { useSidebar } from "@/features/Sidebar/SidebarContext";
import { useSearchParams } from "next/navigation";
import { buttons } from "./ContactUsData";
import CustomAlert from "@/features/Alert/Alert";
import { handleContact, ContactProps } from "@/services/User/contactUs";
import "./ContactUs.css";

interface ContentRendererProps {
  activeContent: string;
  formData: ContactProps;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  loadedContent: Record<string, string>;
}

const ContentRenderer = React.memo<ContentRendererProps>(
  ({ activeContent, formData, handleChange, loadedContent }) => {
    if (activeContent === "contact") {
      return (
        <div>
          <div className="info">
            <div className="gold-gradient">Contact us</div>
            <div className="gold-gradient span">support@gamblecasino.com</div>
            {["email", "subject"].map((field) => (
              <div key={field}>
                <label htmlFor={field}>{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field as keyof ContactProps]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rules-content">
        <h2>{activeContent.replace(/([A-Z])/g, " $1")}</h2>
        {loadedContent[activeContent] ? (
          <div>{loadedContent[activeContent]}</div>
        ) : (
          <div className="loading-indicator">Loading content...</div>
        )}
      </div>
    );
  }
);
ContentRenderer.displayName = "ContentRenderer";

interface ButtonListProps {
  buttons: { label: string; value: string }[];
  setActiveContent: (value: string) => void;
  activeContent: string;
  prefetchRule: (ruleKey: string) => void;
}

const ButtonList = React.memo<ButtonListProps>(
  ({ buttons, setActiveContent, activeContent, prefetchRule }) => (
    <div className="button-container">
      {buttons.map(({ label, value }) => (
        <button
          key={value}
          className={`button-style ${
            activeContent === value ? "active-button" : ""
          }`}
          onClick={() => setActiveContent(value)}
          onMouseEnter={() => prefetchRule(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
);
ButtonList.displayName = "ButtonList";

const useLazyRules = () => {
  const [loadedContent, setLoadedContent] = useState<Record<string, string>>(
    {}
  );

  const loadRule = useCallback(
    async (ruleKey: string) => {
      if (!loadedContent[ruleKey]) {
        try {
          const response = await fetch(`/rules/${ruleKey}.md`);
          const text = await response.text();
          setLoadedContent((prev) => ({ ...prev, [ruleKey]: text }));
        } catch {
          setLoadedContent((prev) => ({
            ...prev,
            [ruleKey]: "Content not available",
          }));
        }
      }
    },
    [loadedContent]
  );

  const prefetchRule = useCallback(
    (ruleKey: string) => {
      if (!loadedContent[ruleKey]) {
        fetch(`/rules/${ruleKey}.md`).then(() => {});
      }
    },
    [loadedContent]
  );

  return { loadedContent, loadRule, prefetchRule };
};

const ContactUs = () => {
  const { isOpen } = useSidebar();
  const searchParams = useSearchParams();
  const { loadedContent, loadRule, prefetchRule } = useLazyRules();

  const [formData, setFormData] = useState<ContactProps>({
    email: "",
    subject: "",
    message: "",
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [activeContent, setActiveContent] = useState("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const contentFromQuery = searchParams.get("activeContent");
    if (contentFromQuery && contentFromQuery !== activeContent) {
      setActiveContent(contentFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeContent !== "contact") {
      loadRule(activeContent);
    }
  }, [activeContent, loadRule]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await handleContact(formData);
      setAlert(result);

      if (result.type === "success") {
        setFormData({ email: "", subject: "", message: "" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <form
        className={`feedback-form ${isOpen ? "feedback-form-unshifted" : ""}`}
        onSubmit={handleSubmit}
      >
        <ContentRenderer
          activeContent={activeContent}
          formData={formData}
          handleChange={handleChange}
          loadedContent={loadedContent}
        />

        {alert && (
          <CustomAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {activeContent === "contact" && (
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Отправить"}
          </button>
        )}
      </form>

      <ButtonList
        buttons={buttons}
        setActiveContent={setActiveContent}
        activeContent={activeContent}
        prefetchRule={prefetchRule}
      />
    </div>
  );
};

export default ContactUs;
