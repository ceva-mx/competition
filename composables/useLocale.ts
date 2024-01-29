export function useLocalization() {
  const localePath = useLocalePath();
  const { t: transateLocal } = useI18n({ useScope: 'local' });
  const { t: transateGlobal } = useI18n({ useScope: 'global' });

  return {
    localePath,
    transateLocal,
    transateGlobal,
  };
}
