# Panel Project Managera - Preliminary Requirements Document

**Wersja:** 1.0  
**Data:** 2025-09-29  
**Autor:** AI Business Analyst  
**Status:** Do akceptacji przez stakeholderów  

---

## 1. Podsumowanie Menedżerskie

**Panel Project Managera** to centralny dashboard agregujący dane ze wszystkich systemów wewnętrznych organizacji, który eliminuje konieczność manualnego zbierania informacji o projektach z 8 różnych systemów. System będzie obsługiwał 20 Project Managerów zarządzających projektami IT dla klientów zewnętrznych w 1000-osobowej organizacji.

**Kluczowe korzyści:**
- Eliminacja manualnego zbierania danych z wielu systemów
- Poprawa dokładności raportowania projektów  
- Usprawnienie transferu wiedzy między PM
- Centralizacja informacji projektowych w jednym miejscu

**Timeline:** MVP w 6 miesięcy  
**Zespół realizacyjny:** Wewnętrzny full-stack team  
**Kluczowe integracje:** Britesheet, Blink, GitLab, Freshservice  

---

## 2. Cel Biznesowy i Problem

### Problem Statement
Project Managerowie w 1000-osobowej organizacji IT muszą ręcznie zbierać informacje o projektach z 8 różnych systemów (Britesheet, Blink, ManageEngine Endpoint Central, Freshservice, GitLab, Redmine, Jira, GDrive), co powoduje:
- Opóźnienia w projektach
- Błędy w raportowaniu  
- Trudności w transferze wiedzy przy zmianie PM
- Fragmentację informacji projektowych

### Proponowane Rozwiązanie
Stworzenie "Panel Project Managera" - centralnego dashboardu agregującego dane ze wszystkich systemów wewnętrznych, zapewniającego:
- Jednolity widok na wszystkie projekty
- Automatyczne generowanie raportów
- Alerty o opóźnieniach i problemach
- Centralne repozytorium informacji projektowych

### Kluczowe Cele Biznesowe
1. **Eliminacja manualnego zbierania danych** z wielu systemów
2. **Poprawa dokładności raportowania** projektów (redukcja błędów)
3. **Usprawnienie transferu wiedzy** między Project Managerami
4. **Zapobieganie narastaniu problemów** przy skalowaniu organizacji

---

## 3. Profile Użytkowników (Persony)

### Primary Persona: Project Manager
- **Profil:** Mid-level doświadczenie w zarządzaniu projektami
- **Obciążenie:** 3-5 projektów jednocześnie
- **Główne zadania:** Status updates, zarządzanie zespołami i zasobami projektów
- **Liczba użytkowników:** 20 osób
- **Potrzeby:** Szybki dostęp do informacji projektowych, generowanie raportów, monitoring statusów

### Secondary Personas

**Helpdesk**
- **Rola:** Rozwiązywanie ticketów na dostępy i zasoby sprzętowe
- **Zadania:** Zarządzanie uprawnieniami GitLab, wsparcie PM w podstawowych problemach
- **Potrzeby:** Dostęp do informacji o środowiskach projektów

**Admins**
- **Rola:** Konfiguracja środowisk deweloperskich dla projektów
- **Zadania:** Provisioning zasobów, setup środowisk
- **Potrzeby:** Informacje o wymaganiach technicznych projektów

**Security/Compliance**
- **Rola:** Wsparcie PM w audytach zewnętrznych
- **Zadania:** Tłumaczenie wymagań bezpieczeństwa z dokumentacji klienta
- **Potrzeby:** Dostęp do compliance statusu projektów

**Managerowie**
- **Rola:** Manager działu PM
- **Zadania:** Monitoring ogólnego postępu projektów w dziale
- **Potrzeby:** High-level overview, quarterly raporty

---

## 4. Wymagania Funkcjonalne (User Stories)

### 🎯 MVP STORIES (Wersja 1.0)

**MODUŁ: Dashboard i Przegląd Projektów**

**ST-001** Jako PM, chcę zobaczyć dashboard z listą moich projektów (status, timeline, zespół), żeby mieć szybki przegląd wszystkich projektów w jednym miejscu.

**ST-002** Jako PM, chcę zobaczyć szczegóły wybranego projektu (tasks z Jira, commits z GitLab, tickets z Freshservice), żeby mieć pełny obraz projektu.

**ST-006** Jako PM, chcę filtrować projekty według statusu/klienta/zespołu, żeby szybko znajdować interesujące mnie projekty.

**MODUŁ: Alerty i Monitorowanie**

**ST-003** Jako PM, chcę otrzymywać alerty o opóźnieniach w projektach, żeby móc szybko reagować na problemy.

**MODUŁ: Raportowanie**

**ST-004** Jako PM, chcę generować weekly raport o statusie projektów, żeby przekazać informacje managerowi.

**ST-008** Jako PM, chcę exportować dane projektów do Excel, żeby tworzyć custom raporty.

**MODUŁ: Zarządzanie Zasobami**

**ST-007** Jako PM, chcę widzieć zasoby projektowe (sprzęt, dostępy) z Britesheet/Blink, żeby zarządzać allocation zespołu.

**MODUŁ: Management View**

**ST-005** Jako Manager, chcę przeglądać high-level overview wszystkich projektów w dziale, żeby monitorować ogólny postęp.

### 🚀 FUTURE FEATURES (Wersja 2.0+)

**ST-009** Jako Helpdesk, chcę widzieć informacje o środowiskach projektów, żeby lepiej rozwiązywać tickety.

**ST-010** Jako Admin, chcę widzieć wymagania na środowiska deweloperskie, żeby planować konfigurację.

**ST-011** Jako Security/Compliance, chcę widzieć compliance status projektów, żeby wspierać audyty.

**ST-012** Jako PM, chcę otrzymywać notyfikacje o zmianach w dokumentacji projektu (GDrive), żeby być na bieżąco.

**ST-013** Jako PM, chcę widzieć timeline wszystkich projektów w kalendarzu, żeby planować capacity zespołu.

**ST-014** Jako PM, chcę integrację z Redmine dla pełnego tracking tasków, żeby mieć kompletny obraz.

**ST-015** Jako Manager, chcę otrzymywać automated monthly raporty, żeby oszczędzać czas na raportowanie.

---

## 5. Wymagania Niefunkcjonalne

### Wydajność
- **Dashboard loading time:** ≤ 5 sekund
- **Odświeżanie danych:** Co 15 minut (configurable)
- **Availability:** Standardowe godziny pracy (8:00-18:00, Pn-Pt)
- **Concurrent users:** 20 użytkowników jednocześnie

### Bezpieczeństwo
- **Dane:** Wrażliwe/poufne (informacje klientów, projekty)
- **Autentykacja:** OAuth integration
- **Audit log:** Podstawowy (kto, co, kiedy eksportował/przeglądał)
- **Szyfrowanie:** HTTPS, zabezpieczenie danych w transit i at rest
- **Session management:** Automatic timeout po 8 godzinach

### UI/UX
- **Responsywny design:** Desktop/tablet support
- **Accessibility:** WCAG 2.1 Level A compliance
- **Browser support:** Chrome, Firefox, Edge (latest 2 versions)
- **Language:** Polski/angielski interfejs
- **Intuicyjność:** Dedykowane dla mid-level PM (minimal training needed)

### Integracje
- **Systemy źródłowe:** Britesheet, Blink, GitLab, Freshservice
- **API rate limits:** Respektowanie limitów systemów źródłowych
- **Error handling:** Graceful degradation przy niedostępności systemów
- **Data consistency:** Eventual consistency model (15min sync)

### Zgodność z przepisami
- **RODO/GDPR:** Pełna zgodność dla danych klientów
  - Prawo do usunięcia danych
  - Portabilność danych
  - Zgoda na przetwarzanie
- **Data retention:** Configurable (default 2 lata)
- **Audyty:** Podstawowe logi bezpieczeństwa

---

## 6. Założenia, Ograniczenia i Zidentyfikowane Ryzyka

### Założenia
- Zespół wewnętrzny ma kompetencje full-stack development
- Systemy źródłowe mają dostępne API lub możliwość integracji
- Stakeholderzy będą dostępni podczas implementacji do weryfikacji
- Budżet na zewnętrzne integracje/API będzie dostępny

### Ograniczenia
- **Timeline:** MVP w 6 miesięcy (non-negotiable)
- **Zespół:** Wewnętrzny zespół development (bez external vendors)
- **Systemy:** Integracja z istniejącymi systemami (brak zastąpienia)
- **Technologie:** Brak konkretnych ograniczeń technologicznych

### Zidentyfikowane Ryzyka

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitigation |
|--------|-------------------|--------|------------|
| Złożoność integracji z 4 systemami | Wysokie | Wysokie | Fazowanie implementacji, spike'i techniczne |
| Brak dokumentacji API systemów | Średnie | Wysokie | Wczesna weryfikacja z administratorami systemów |
| RODO compliance przy agregacji danych | Średnie | Wysokie | Konsultacje z legal/compliance team |
| Wydajność przy dużej ilości danych | Średnie | Średnie | Caching, pagination, optymalizacja zapytań |
| Zmiany w systemach źródłowych | Niskie | Średnie | Monitoring zmian, flexible integration layer |

---

## 7. Otwarte Pytania i Dalsze Kroki

### Otwarte Pytania
1. **Budżet na integracje:** Jaki jest dostępny budżet na płatne API/integracje?
2. **Legal approval:** Czy wymagane jest formal approval od legal team dla RODO?
3. **System administration:** Kto będzie final administratorem systemu?
4. **Backup & Recovery:** Jakie są wymagania dla disaster recovery?
5. **Testing environment:** Czy dostępne są test/staging środowiska systemów źródłowych?

### Dalsze Kroki
1. **Akceptacja dokumentu** przez stakeholderów ✅
2. **Technical spike** - weryfikacja integracji z systemami (2 tygodnie)
3. **Architecture design** - high-level system design (1 tydzień)
4. **Legal consultation** - RODO compliance review (1 tydzień)
5. **Implementation kickoff** - start development zespołu

### Success Metrics dla Projektu
- **Adoption rate:** >80% PM używa system w ciągu 3 miesięcy od launch
- **Time savings:** Redukcja czasu na przygotowanie raportów o >50%
- **Data accuracy:** Redukcja błędów raportowania o >70%
- **User satisfaction:** >4/5 w feedback surveys
- **System availability:** >95% uptime w godzinach pracy

---

**Dokument przygotowany przez AI Business Analyst**  
**Data ostatniej aktualizacji:** 2025-09-29  
**Status:** Oczekuje na akceptację stakeholderów**