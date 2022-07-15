# busPark


# Написать программу, моделирующую работу автобусного парка.  
Сведения о каждом маршруте: номер, количество остановок, длина маршрута (в километрах), количество автобусов, необходимых для обеспечения движения по маршруту.  

Сведения о каждом автобусе: номер автобуса, расход бензина (в литрах на километр), фамилия и имя водителя, номер маршрута, состояние (работает, простаивает, на ремонте).  

Данные об автобусах и маршрутах хранятся в бд

С помощью меню необходимо обеспечить следующие функции:  

- Добавить новый маршрут/автобус.
- Удалить автобус по номеру.
- Удалить маршрут по номеру: принадлежащие ему автобусы должны 
- сменить состояние на «простаивает» и номер маршрута на «свободен»
- Распределить свободные автобусы на маршруты.
- Сменить состояние автобуса.
- Переместить автобус между маршрутами.
- Отобразить список простаивающих/работающих/ремонтирующихся автобусов для маршрута.
- Проверить достаточность/избыточность работающих автобусов на маршруте.
- По фамилии водителя найти, на каком маршруте он сейчас работает.
- Составить статистику расхода бензина для маршрутов, учитывать только работающие автобусы.  
- поиск маршрутов из А в Б

## REST приложение
бэк на nodeJs + postgresql
Фронт в дальнейшем на реакте