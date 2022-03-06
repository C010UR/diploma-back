CREATE OR REPLACE FUNCTION create_dummy_requests(int) 
RETURNS void
AS $$
DECLARE
  clients text[][] := ARRAY [
    [ 'Лаврентьев Исаак', '(10) 000-65-41' ],
    [ 'Герасимов Юстиниан', '(10) 402-46-20' ],
    [ 'Соловьёв Лазарь', '(11) 644-40-70' ],
    [ 'Галкин Владислав', '(13) 056-39-40' ],
    [ 'Носов Ким', '(13) 214-71-81' ],
    [ 'Ларионов Самуил', '(15) 826-28-45' ],
    [ 'Зайцев Арсен', '(16) 818-22-92' ],
    [ 'Шестаков Евдоким', '(16) 969-31-58' ],
    [ 'Исаев Мечеслав', '(17) 935-62-23' ],
    [ 'Уваров Юлиан', '(18) 806-96-96' ],
    [ 'Агафонов Соломон', '(19) 559-65-24' ],
    [ 'Емельянов Касьян', '(20) 306-51-90' ],
    [ 'Потапов Орест', '(20) 512-24-10' ],
    [ 'Логинов Рубен', '(24) 706-40-12' ],
    [ 'Веселов Абрам', '(25) 855-85-17' ],
    [ 'Мясников Егор', '(26) 613-29-74' ],
    [ 'Калинин Рудольф', '(27) 121-15-64' ],
    [ 'Дмитриев Алексей', '(28) 782-23-07' ],
    [ 'Королёв Роман', '(29) 455-84-56' ],
    [ 'Трофимов Лукьян', '(30) 429-79-14' ],
    [ 'Суханов Эдуард', '(30) 515-74-55' ],
    [ 'Жуков Эрнест', '(32) 157-90-70' ],
    [ 'Прохоров Осип', '(32) 554-33-54' ],
    [ 'Щукин Лукьян', '(33) 108-58-38' ],
    [ 'Блинов Арсен', '(33) 492-96-04' ],
    [ 'Петухов Нинель', '(34) 679-24-93' ],
    [ 'Захаров Зиновий', '(36) 005-83-70' ],
    [ 'Зимин Святослав', '(36) 253-84-07' ],
    [ 'Хохлов Денис', '(36) 283-94-89' ],
    [ 'Логинов Максим', '(36) 512-08-59' ],
    [ 'Кабанов Валентин', '(38) 201-03-68' ],
    [ 'Рожков Георгий', '(40) 353-31-14' ],
    [ 'Герасимов Эдуард', '(42) 497-07-25' ],
    [ 'Пестов Любовь', '(44) 708-28-35' ],
    [ 'Калинин Савелий', '(44) 918-95-06' ],
    [ 'Меркушев Тарас', '(49) 450-74-07' ],
    [ 'Доронин Игнат', '(49) 569-04-61' ],
    [ 'Одинцов Гаянэ', '(49) 925-42-37' ],
    [ 'Григорьев Гордий', '(51) 168-76-55' ],
    [ 'Беспалов Лев', '(55) 716-72-04' ],
    [ 'Мишин Абрам', '(58) 645-38-56' ],
    [ 'Филиппов Дмитрий', '(58) 747-96-01' ],
    [ 'Копылов Степан', '(59) 069-36-96' ],
    [ 'Потапов Степан', '(59) 551-35-22' ],
    [ 'Романов Гарри', '(60) 203-11-94' ],
    [ 'Фокин Аверкий', '(60) 712-38-26' ],
    [ 'Виноградов Алан', '(62) 345-57-79' ],
    [ 'Гаврилов Богдан', '(64) 924-69-15' ],
    [ 'Михайлов Леонтий', '(65) 409-97-94' ],
    [ 'Савельев Мстислав', '(66) 680-22-08' ],
    [ 'Копылова Лили', '(68) 131-56-03' ],
    [ 'Ситникова Ксения', '(69) 230-27-25' ],
    [ 'Андреева Ядвига', '(71) 537-99-15' ],
    [ 'Лобанова Адель', '(72) 132-32-28' ],
    [ 'Александрова Снежана', '(75) 351-48-67' ],
    [ 'Назарова Элеонора', '(76) 717-28-75' ],
    [ 'Вишнякова Лана', '(80) 515-35-28' ],
    [ 'Крылова Ирэн', '(80) 755-47-39' ],
    [ 'Маркова Арьяна', '(81) 594-70-71' ],
    [ 'Калашникова Сима', '(81) 666-66-70' ],
    [ 'Артемьева Аюна', '(83) 646-22-76' ],
    [ 'Михайлова Антонина', '(87) 002-81-16' ],
    [ 'Красильникова Доля', '(90) 179-25-41' ],
    [ 'Козлова Винетта', '(90) 574-87-22' ],
    [ 'Савина Инна', '(92) 594-51-73' ],
    [ 'Шашкова Амалия', '(93) 702-01-96' ],
    [ 'Сорокина Зоя', '(95) 347-60-46' ],
    [ 'Иванова Илена', '(95) 641-98-46' ],
    [ 'Александрова Эжени', '(96) 820-86-24' ],
    [ 'Волкова Эльвира', '(98) 347-02-19' ],
    [ 'Ситникова Эля', NULL ],
    [ 'Лыткина Артемида', NULL ],
    [ 'Русакова Аксинья', NULL ],
    [ 'Овчинникова Глория', NULL ],
    [ 'Кудрявцева Милана', NULL ],
    [ 'Тетерина Фая', NULL ],
    [ 'Рыбакова Сара', NULL ],
    [ 'Гурьева Эмилия', NULL ],
    [ 'Гришина Милана', NULL ],
    [ 'Ларионова Илена', NULL ],
    [ 'Никифорова Лада', NULL ],
    [ 'Ефремова Святослава', NULL ],
    [ 'Харитонова Жасмин', NULL ],
    [ 'Уварова Лана', NULL ],
    [ 'Комиссарова Гражина', NULL ],
    [ 'Суханова Кармелитта', NULL ],
    [ 'Горшкова Роксалана', NULL ],
    [ 'Горбачёва Мирра', NULL ],
    [ 'Орехова Никки', NULL ],
    [ 'Нестерова Азалия', NULL ],
    [ 'Мельникова Ульяна', NULL ],
    [ 'Морозова Калерия', NULL ],
    [ 'Ильина Роксана', NULL ],
    [ 'Васильева Аза', NULL ],
    [ 'Яковлева Жанна', NULL ],
    [ 'Рожкова Эшли', NULL ],
    [ 'Силина Анжелика', NULL ],
    [ 'Абрамова Глория', NULL ],
    [ 'Кулакова Харита', NULL ],
    [ 'Рожкова Глафира', NULL ]
  ];
  __defect_description text := 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  urgency uuid[];
  cabinets uuid[];
  technicians uuid[];
  defects text[];
  works text[];
  intervals interval[];
  random_1 integer;
  random_2 integer;
  _defect_description text;
  _technician uuid;
  _done_at timestamptz;
  _work text[];
BEGIN
  urgency = (SELECT array_agg(_id) FROM (SELECT _id FROM urgency OFFSET 1) as a);
  cabinets = (SELECT array_agg(_id) FROM (SELECT _id FROM cabinets OFFSET 1) as a);
  technicians = (SELECT array_agg(_id) FROM (SELECT _id FROM technicians OFFSET 1) as a);
  defects = (SELECT array_agg(_field) FROM (SELECT _field FROM common_defects OFFSET 1) as a);
  works = (SELECT array_agg(_field) FROM (SELECT _field FROM common_works OFFSET 1) as a);
  intervals = (SELECT array_agg(justify_interval) FROM (select justify_interval(random() * interval '100 day 5 hour') from generate_series(1, $1) order by 1 asc) as a);
  FOR counter IN 1..$1
  LOOP
    random_1 = (random() * 10)::integer % 2;
    random_2 = ((random() * 10)::integer % 4) / 3;
    IF (random_1 = 0) THEN
      _defect_description = __defect_description;
    ELSE 
      _defect_description = NULL;
    END IF;
    IF (random_2 = 0) THEN
      _technician = technicians[(random() * 1000)::integer % array_length(technicians, 1) + 1];
      _done_at = NOW() - intervals[counter];
      _work = ARRAY[works[(random() * 1000)::integer % array_length(works, 1) + 1]];
    ELSE 
      _technician = NULL;
      _done_at = NULL;
      _work = NULL;
    END IF;
    INSERT INTO requests (created_at, done_at, urgency_id, cabinet_id, technician_id, performed_works, client, client_phone, defects, defect_description)
    VALUES (
      (NOW() - intervals[counter]),
      _done_at,
      urgency[(random() * 1000)::integer % array_length(urgency, 1) + 1],
      cabinets[(random() * 1000)::integer % array_length(cabinets, 1) + 1],
      _technician,
      _work,
      clients[(random() * 1000)::integer % array_length(clients, 1) + 1][1],
      clients[(random() * 1000)::integer % array_length(clients, 1) + 1][2],
      defects[(random() * 1000)::integer % array_length(defects, 1) + 1],
      _defect_description
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;


