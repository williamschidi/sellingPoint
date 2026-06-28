import { useListPropertyEntry } from "../../hooks/auth/useListPropertyEntry";

/**
 * Shared CTA for starting the list-property auth journey.
 * Guests → role selection + sign-in; agents → dashboard.
 */
export default function ListPropertyButton({
  children = "List property",
  className = "btn-primary",
  onAfterClick,
}) {
  const goToListProperty = useListPropertyEntry();

  const handleClick = () => {
    goToListProperty();
    onAfterClick?.();
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
