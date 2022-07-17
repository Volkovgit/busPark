CREATE TABLE bus (
    id serial NOT NULL PRIMARY KEY,
    gas float,
    driver VARCHAR(500),
    rout integer,
    status integer,
    FOREIGN KEY (rout) REFERENCES public.routes(id) ON DELETE CASCADE
);



select * from public.bus;
select * from public.routes;

DELETE FROM public.routes WHERE id = 4;

INSERT INTO public.bus (gas,driver,rout,status) VALUES (2.4,'Тест Тестовый',4,1);


SELECT DISTINCT routes.id FROM public.routes
JOIN public.bus ON bus.rout = routes.id
WHERE bus.driver = 'бла бла';