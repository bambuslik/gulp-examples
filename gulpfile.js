'use strict';

/*
 CONTENTS
 #001 подключаемые модули
 #002 ЗАДАЧА: таск по умолчанию
 #003 ЗАДАЧА: элементарный таск
 #004 ЗАДАЧА: элементарный таск, запуск через вызов функции
 #005 ЗАДАЧА: запуск серии задач: последовательно и параллельно
 #006 ЗАДАЧА: пример элементарного билда - копируем все из /src в /build
 #007 ЗАДАЧА: очистка папки билда
 #008 ЗАДАЧА: вывод обрабатываемых в потоке файлов в консоль
 #009 ЗАДАЧА: вывод обрабатываемых в потоке файлов в консоль (парсим объект files)
 #010 ЗАДАЧА: вывод обрабатываемых в потоке файлов в консоль (свойства объекта file)
 #011 ЗАДАЧА: распихивает файлы по разным папка в зависимости от расширения
 #012 ЗАДАЧА: копируем в папку билда только css и js файлы (фильтрация на уровне gulp.src)
 #013 ЗАДАЧА: берем все файлы, но не читаем их - уменьшает время обработки
 #014 ЗАДАЧА: компиляция less-файла
 #015 ЗАДАЧА: компиляция less из нескольких файлов
 #017 ЗАДАЧА: вывод в консоль операций (дебаг)
 #018 ЗАДАЧА: компиляция less с sourcemaps
 #019 ЗАДАЧА: переменные окружения
 #020 ЗАДАЧА: ветвление
 #021 ЗАДАЧА: вотчер - сборка проекта (следим за всеми html-файлами, пересобираем на лету при изменениях в файлах)
 #022 ЗАДАЧА: вотчер с инкрементом
 #023 ЗАДАЧА: сервер browser-sync (следим за всеми файлами в билде)
 #024 ЗАДАЧА: сервер browser-sync (следим за всеми файлами в src)
 #025 ЗАДАЧА: обработка ошибок (простейший пример)
 #026 ЗАДАЧА: обработка ошибок с пом gulp-notify
 #027 ЗАДАЧА: обработка ошибок с пом gulp-notify + plumber
 #028 ЗАДАЧА: постпроцессинг (автопрефиксер, mqpacker)
 #029 ЗАДАЧА: удалить из кода (из html-файлов) строки с комменатриями по разработке
 #030 ЗАДАЧА: инклудим файлы
 #031 ЗАДАЧА: копировать все картинки в билд, не тратить время на скопированные ранее
 #032 ЗАДАЧА: оптимизировать картинки для билда
 #033 ЗАДАЧА: углификация JS
 #034 ЗАДАЧА: углификация и конкатенация JS
 #035 ЗАДАЧА: сжать CSS
 #036 ЗАДАЧА: добавить в имя CSS-файла хэш метку для борьбы с кэшированием
 #037 ЗАДАЧА: использовать значения из package.json
 */


//#001 подключаемые модули
//установили галп локально в проект: npm install gulpjs/gulp#4.0
const gulp = require('gulp'); //подключили галп в проект
//тк галп установлен локально, запуск галпа: ./node_modules/.bin/gulp [имя команды]

//установили плагин gulp-less: npm install gulp-less
const less = require('gulp-less'); //подключили в проект

//установили плагин gulp-rename: npm install gulp-rename
const rename = require('gulp-rename'); //подключили в проект

//установили плагин gulp-concat: npm install gulp-concat
const concat = require('gulp-concat'); //подключили в проект

//установили плагин gulp-debug: npm install gulp-debug
const debug = require('gulp-debug'); //подключили в проект

//установили плагин gulp-sourcemaps: npm install gulp-sourcemaps
const sourcemaps = require('gulp-sourcemaps'); //подключили в проект

//установили плагин gulp-if: npm install gulp-if
const gulpif = require('gulp-if'); //подключили в проект

//установили плагин del: npm install del
const del = require('del'); //подключили в проект

//установили плагин browser-sync: npm install browser-sync
const browserSync = require('browser-sync').create(); //подключили в проект и вызвали

//установили плагин gulp-notify: npm install gulp-notify
const notify = require('gulp-notify'); //подключили в проект

//установили плагин gulp-plumber: npm install gulp-plumber
const plumber = require('gulp-plumber'); //подключили в проект

//установили плагин gulp-postcss: npm install gulp-postcss
const postcss = require('gulp-postcss'); //подключили в проект

//установили плагин autoprefixer: npm install autoprefixer
const autoprefixer = require('autoprefixer');

//установили плагин css-mqpacker: npm install css-mqpacker
const mqpacker = require('css-mqpacker'); //подключили в проект

//установили плагин gulp-replace: npm install gulp-replace
const replace = require('gulp-replace'); //подключили в проект

//установили плагин gulp-file-include: npm install gulp-file-include
const fileinclude = require('gulp-file-include'); //подключили в проект

//установили плагин gulp-newer: npm install gulp-newer
const newer = require('gulp-newer'); //подключили в проект

//установили плагин gulp-imagemin: npm install gulp-imagemin
const imagemin = require('gulp-imagemin'); //подключили в проект

//установили плагин gulp-uglify: npm install gulp-uglify
const uglify = require('gulp-uglify'); //подключили в проект

//установили плагин gulp-uglify: npm install gulp-cleancss
const cleanCSS = require('gulp-cleancss'); //подключили в проект

//установили плагин gulp-rev: npm install gulp-rev
const rev = require('gulp-rev'); //подключили в проект

//установили плагин gulp-rev: npm install gulp-rev-replace
const revReplace = require('gulp-rev-replace'); //подключили в проект


/*
 ------------------------------------------------------------------------------------
 #002 ЗАДАЧА: таск по умолчанию
 Запуск задачи из терминала: ./node_modules/.bin/gulp
 */
gulp.task('default', function (callback) {
	console.log(																//вывод в консоль
		"default task"
	);
	callback();																	//сигнал о завершении таска
});


/*
 ------------------------------------------------------------------------------------
 #003 ЗАДАЧА: элементарный таск
 Запуск задачи из терминала: ./node_modules/.bin/gulp hello1
 */
gulp.task('hello1', function (callback) {
	console.log(																//вывод в консоль
		"hello!"
	);
	callback();
});


/*
 ------------------------------------------------------------------------------------
 #004 ЗАДАЧА: элементарный таск, запуск через вызов функции
 Запуск задачи из терминала: ./node_modules/.bin/gulp hello2
 минус этого варианта в том, что нельзя исп-ть зарезеривированные имена, типа default
 */
function hello2(callback) {														//определяем функцию
	console.log(																//вывод в консоль
		"hello again!"
	);
	callback();
}

gulp.task(hello2);																//таск подхватывает функцию по имени


/*
 ------------------------------------------------------------------------------------
 #005 ЗАДАЧА: запуск серии задач: последовательно и параллельно
 Запуск задачи из терминала: ./node_modules/.bin/gulp hello:ser
 Запуск задачи из терминала: ./node_modules/.bin/gulp hello:par
 */
gulp.task('hello:ser', gulp.series('hello1', 'hello2'));
gulp.task('hello:par', gulp.parallel('hello1', 'hello2'));


/*
 ------------------------------------------------------------------------------------
 #006 ЗАДАЧА: пример элементарного билда - копируем все из /src в /build
 Запуск задачи из терминала: ./node_modules/.bin/gulp build1
 */
gulp.task('build1', function () {
	return gulp.src('src/**/*.*')												//указываем источник, маска - все файлы во всех папках. паттерн - minimatch
		.pipe(gulp.dest('build'));												//пропускаем через pipe, указываем папку-назначение
});


/*
 ------------------------------------------------------------------------------------
 #007 ЗАДАЧА: очистка папки билда - /build
 Запуск задачи из терминала: ./node_modules/.bin/gulp clean1
 */
gulp.task('clean1', function () {
	return del('build/**/*');													//маска - всё в папке build
});


/*
 ------------------------------------------------------------------------------------
 #008 ЗАДАЧА: вывод обрабатываемых в потоке файлов в консоль
 Запуск задачи из терминала: ./node_modules/.bin/gulp build1:log
 https://youtu.be/NBdKplKl_3Q?t=2m
 */
gulp.task('build1:log', function () {
	return gulp.src('src/**/*.*')
		.on('data', function (file) {											//обработчик on('data') потока
			console.log(
				file
			);
		})
		.pipe(gulp.dest('build'));
});


/*
 ------------------------------------------------------------------------------------
 #009 ЗАДАЧА: вывод обрабатываемых в потоке файлов в консоль (парсим объект files)
 Запуск задачи из терминала: ./node_modules/.bin/gulp build1:log2
 */
gulp.task('build1:log2', function () {
	return gulp.src('src/**/*.*')
		.on('data', function (file) {
			console.log(
				'-------------------------------------------\n',
				JSON.stringify(file, null, 2)									//распарсить объект file - много вкусненького. конструкция JS
			);
		})
		.pipe(gulp.dest('build'));
});


/*
 ------------------------------------------------------------------------------------
 #010 ЗАДАЧА: вывод обрабатываемых в потоке файлов в консоль (свойства объекта file)
 Запуск задачи из терминала: ./node_modules/.bin/gulp build1:log3
 https://youtu.be/NBdKplKl_3Q?t=3m
 */
gulp.task('build1:log3', function () {
	return gulp.src('src/**/*.*')
		.on('data', function (file) {
			console.log(
				'-------------------------------------------\n',
				{
					contents: file.contents,
					path: file.path,
					cwd: file.cwd,
					base: file.base,
					//ниже вычисляемые значения объекта - они не парсятся тк вычилсяются на лету
					relative: file.relative,
					dirname: file.dirname,
					basename: file.basename,
					stem: file.stem,
					extname: file.extname
				}
			);
		})
		.pipe(gulp.dest('build'));
});


/*
 ------------------------------------------------------------------------------------
 #011 ЗАДАЧА: распихивает файлы по разным папка в зависимости от расширения
 css файлы в build/css, js в build/js, все остальные просто в build (сохраняя вложенность
 Запуск задачи из терминала: ./node_modules/.bin/gulp build2
 */
gulp.task('build2', function () {
	return gulp.src('src/*.*')													//берем только корень src, для демонстрации
		.pipe(gulp.dest(function (file) {
			return file.extname == '.js' ? 'build/js' :
				file.extname == '.css' ? 'build/css' : 'build'
		}));
});


/*
 ------------------------------------------------------------------------------------
 #012 ЗАДАЧА: копируем в папку билда только css и js файлы (фильтрация на уровне gulp.src)
 Запуск задачи из терминала: ./node_modules/.bin/gulp build3
 */
gulp.task('build3', function () {
	return gulp.src('src/**/{*.css,*.js}')
		.pipe(gulp.dest('build'));
});


/*
 ------------------------------------------------------------------------------------
 #013 ЗАДАЧА: берем все файлы, но не читаем их - уменьшает время обработки
 использвать только, если не нужно читать файлы (не используем содержимое)
 Запуск задачи из терминала: ./node_modules/.bin/gulp build4
 https://youtu.be/NBdKplKl_3Q?t=9m20s
 */
gulp.task('build4', function () {
	return gulp.src('src/**/*.*', {read: false})								//создаст только папки под файлы, но файлы не скопируются (содержимое нам не дсотупно)
		.pipe(gulp.dest('build'));
});


/*
 ------------------------------------------------------------------------------------
 #014 ЗАДАЧА: компиляция less-файла
 Запуск задачи из терминала: ./node_modules/.bin/gulp build5
 */
gulp.task('less1', function () {
	return gulp.src('src/less/style.less') 										//берем style.less
		.pipe(less()) 															//пропускаем через компилятор less, он сам меняет расширение на css
		.pipe(gulp.dest('build/css')); 											//выкладываем в билд
});

gulp.task('html1', function () {
	return gulp.src('src/index.html')											//берем index.html
		.pipe(gulp.dest('build'));												//кладем в /build
});

gulp.task('build5', gulp.series('clean1', 'less1', 'html1'));					//выполняем последовательно: очистка билда, компиляция и перемещение style.less, перемещение index.html


/*
 ------------------------------------------------------------------------------------
 #015 ЗАДАЧА: компиляция less из нескольких файлов
 порядок объединения файлов - вперемешку тк потоки асинхронны
 если нужен четкий порядок, лучше подключать через import в самих файлах.
 т.е. следует в главном less-файле подключить остальные less-файлы импортом и вернуться к предыдущему примеру
 Запуск задачи из терминала: ./node_modules/.bin/gulp build6
 */
gulp.task('less2', function () {
	return gulp.src('src/less/*.less') 											//берем все .less файлы
		.pipe(less()) 															//пропускаем через компилятор less
		.pipe(concat('style.css'))												//конкатенируем все файлы в потоке в style.css
		.pipe(gulp.dest('build/css')); 											//выкладываем в билд
});

gulp.task('build6', gulp.series('clean1', 'less2', 'html1'));					//выполняем последовательно задачи


/*
 ------------------------------------------------------------------------------------
 #017 ЗАДАЧА: вывод в консоль операций (дебаг)
 необязательный параметр title с произвольными обозначениями операций для облегечения восприятия
 Запуск задачи из терминала: ./node_modules/.bin/gulp build7
 */
gulp.task('less3', function () {
	return gulp.src('src/less/*.less') 											//берем все .less файлы
		.pipe(debug({title: 'src'}))											//дебаг текущей задачи
		.pipe(less()) 															//пропускаем через компилятор less
		.pipe(debug({title: 'less'}))											//дебаг текущей задачи
		.pipe(concat('style.css'))												//конкатенируем все файлы в потоке в style.css
		.pipe(debug({title: 'concat'}))											//дебаг текущей задачи
		.pipe(gulp.dest('build/css')); 											//выкладываем в билд
});

gulp.task('build7', gulp.series('clean1', 'less3', 'html1'));		//выполняем последовательно задачи


/*
 ------------------------------------------------------------------------------------
 #018 ЗАДАЧА: компиляция less с sourcemaps
 Запуск задачи из терминала: ./node_modules/.bin/gulp build8
 */
gulp.task('less4', function () {
	return gulp.src('src/less/style.less')										//берем style.less
		.pipe(sourcemaps.init())												//инициализируем sourcecmaps (начинаем следить)
		.pipe(less())															//пропускаем через компилятор less
		.pipe(sourcemaps.write())												//пишем все пропущенные через поток данные
		.pipe(gulp.dest('build/css/'));											//выкладываем в билд
	/*
	 теперь в конце all.css появилась карта кода в base64 кодированном виде
	 для размещения карты кода в отдельном файле, достаточно указать где ее записать в вызове врайта
	 .pipe(sourcemaps.write('/')) //записать карту кода в ту же папку
	 */
});

gulp.task('build8', gulp.series('clean1', 'less4', 'html1'));					//выполняем последовательно задачи


/*
 ------------------------------------------------------------------------------------
 #019 ЗАДАЧА: переменные окружения
 можно из консоли при запуске команд галпа передавать занчения переменных в галп и он будет реагировать на них
 например, мы хотим ветвление в таске в зависимости от того, в каком состоянии находится проект - production или development
 (продакшн минимизируем код js, а в девелопмент - нет, чтобы не занимать лишнее время).
 если вызвать этот таск из консоли:
 ./node_modules/.bin/gulp build9
 таск выполнится по ветке продакшна, тк не передали переменную
 если же вызвать с переменной:
 NODE_ENV=1 ./node_modules/.bin/gulp build9
 пойдем по ветке девелопмента

 пока не понял, нафиг мне это нужно. проще сделать два разных таска для дева и прода...
 Запуск задачи из терминала: ./node_modules/.bin/gulp build9
 */
const isDevelopment = process.env.NODE_ENV; 									//объявили константу isDevelopment
gulp.task('build9', function (callback) {
	if (isDevelopment) {
		console.log(
			"We are in dev: " + isDevelopment									//выводим в консоль содержимое константы
		);
	} else {
		console.log(
			"We are in production!"												//мы в продакшне
		);
	}
	callback();
});


/*
 ------------------------------------------------------------------------------------
 #020 ЗАДАЧА: ветвление
 Запуск задачи из терминала: ./node_modules/.bin/gulp build10
 */
var condition = 1;																//создаем условие для примера
gulp.task('less5', function () {
	return gulp.src('src/less/style.less')
		.pipe(less())
		.pipe(gulpif(condition, rename('style-new-name.css')))					//если условие верно, переименовываем файл
		.pipe(gulp.dest('build/css/'));
});

gulp.task('build10', gulp.series('clean1', 'less5', 'html1'));					//выполняем последовательно задачи


/*
 ------------------------------------------------------------------------------------
 #021 ЗАДАЧА: вотчер - сборка проекта (следим за всеми html-файлами, пересобираем на лету при изменениях в файлах)
 Запуск задачи из терминала: ./node_modules/.bin/gulp build11
 */
gulp.task('html2', function () {
	return gulp.src('src/**/*.html')											//берем все html-файлы (для примера)
		.pipe(debug({title: 'file '}))											//поставили дебаг, чтобы видно было, какие файлы копируются каждый раз
		.pipe(gulp.dest('build'));												//помещаем в билд
});

gulp.task('watch1', function () {												//вызываем вотчер таском
	gulp.watch('src/**/*.html', gulp.series('html2'));							//при изменеиях в любых html-файлах по ук пути - запускаем таск html2
});

gulp.task('build11', gulp.series('clean1', 'watch1'));							//запускаем задачи последовательно - саначала очищаем билд, потом запускаем вотчер
/*
 вторым параметром запускаемый таск или функция.
 даже если таск один - необходимо завернуть в сериес или параллел.
 минус этого таска - он перезаписывает все файлы, даже те, в которых изменения не происходили
 */


/*
 ------------------------------------------------------------------------------------
 #022 ЗАДАЧА: вотчер с инкрементом - не измененные файлы не трогаем, копируем только измененные
 некоторые плагины поддерживают инкремент, те когда происходит вотч - копируеются только те файлы,
 которые были изменены (например, stylus). если плагин не поддерживает инкремент или
 задача не через плагин, а напр тупое копирование, то необходимо выбирать только те файлы,
 которые изменились с момента последнего запуска этой же задачи
 Запуск задачи из терминала: ./node_modules/.bin/gulp build12
 */
gulp.task('html3', function () {
	return gulp.src('src/**/*.html', {since: gulp.lastRun('html3')})			//берем все html-файлы, но только те, которые изменились с
	// даты последнего запуска указанной задачи, т.е. себя же
		.pipe(debug({title: 'file '}))											//поставили дебаг, чтобы видно было, какие файлы копируются каждый раз
		.pipe(gulp.dest('build'));												//помещаем в билд
});
/*
 вообще, использовать since - сомнительное удовольствие (вернее следует грамотно подбирать задачи),
 тк в сборку может не попасть файл, если напр это  компилятор less из нескольких файлов (и они все подключены самим gulp.src,
 а не через require в основном less файле),  ведь если мы внесем изменеие только в один из них - since отфильтрует остальные,
 и сборка получится только из него одного.  есть решения с gulp-remember, но там полно подводных камней
 */

gulp.task('watch2', function () {												//вызываем вотчер таском
	gulp.watch('src/**/*.html', gulp.series('html3'));							//при изменеиях в любых html-файлах по ук пути - запускаем таск html3
});

gulp.task('build12', gulp.series('clean1', 'watch2'));							//запускаем задачи последовательно - саначала очищаем билд, потом запускаем вотчер


/*
 ------------------------------------------------------------------------------------
 #023 ЗАДАЧА: сервер browser-sync (следим за всеми файлами в билде)
 Запуск задачи из терминала: ./node_modules/.bin/gulp serve1
 */
gulp.task('serve1', function () {
	browserSync.init({															//метод init запускает сервер
		server: 'build'															//сервер будет отдавать заданную директорию
	});
	browserSync.watch('build/**/*.*').on('change', browserSync.reload);			//следим за всеми файлами в билде(!!), при изменениях перезапускаем сервер
	/*
	 при такой слежке иногда натыкаюсь на затыки.
	 как я понимаю при нескольких процессах (обработать html, обработать less) browserSync начинает обновлять
	 браузер при первых изменениях, т.е. если less файлы заливаюстя позже html - то browserSync может обновиться
	 после html, и пропустить при этом less-задачу, т.к. он еше отрабатывает. хз - как-то так.
	 */
});
/*
 теперь если запустить таск server1, запустится сервер (по адерсу http://localhost:3000) и будет следить за папкой билда
 если в ней что-то изменить - это отобразится в браузере.
 но пока мы не подтягиваем изменения из папки разрабокти (src) в билд (build).
 не забываем, что нам доступен феб-интерфейс конфига сервера по адресу http://localhost:3001
 */


/*
 ------------------------------------------------------------------------------------
 #024 ЗАДАЧА: сервер browser-sync (следим за всеми файлами в src)
 Запуск задачи из терминала: ./node_modules/.bin/gulp serve2
 */
function reloader(callback) {													//создадим функцию перезапуска browserSync
	browserSync.reload();
	callback();
}

gulp.task('build13', gulp.series('clean1', 'html2', 'less4'));					//очередь задач по билду проекта

gulp.task('serve2', gulp.series('build13', function () {						//выполняем таск build13, после чего
		browserSync.init({														//запускаем browserSync
			server: 'build'
		});
		gulp.watch('src/**/*.*', gulp.series('build13', reloader));				//следим за любыми изменениями в src, при изменениях билдим, перезапускаем browserSync
	}
));


/*
 ------------------------------------------------------------------------------------
 #025 ЗАДАЧА: обработка ошибок (простейший пример)
 По умолчанию при ошибке происходит вывод ошибки в консоль и процесс вываливается.
 Если же повесить обработчик ошибки - поток продолжится.
 Запуск задачи из терминала: ./node_modules/.bin/gulp serve3
 */
gulp.task('less6', function () {
	return gulp.src('src/less/style.less')										//берем style.less
		.pipe(less())															//пропускаем через компилятор less
		.on('error', function (err) { 											//вешаем простейший обработчик ошибок
			//on error необхдимо вешать именно на тот pipe, в котором ожидаем ошибку, если повесить на следующий, то ошибка не отобразится
			console.log(
				err
			);
			this.end(); 														//заказничаем процедуру ошибки, иначе поток не будет продолжен
		})
		.pipe(gulp.dest('build/css'));											//выкладываем в билд в css
});

gulp.task('build14', gulp.series('clean1', 'html2', 'less6'));					//очередь задач по билду проекта

gulp.task('serve3', gulp.series('build14', function () {
	gulp.watch('src/**/*.*', gulp.series('build14'));							//запуск таска и слежка за изменениями
}));


/*
 ------------------------------------------------------------------------------------
 #026 ЗАДАЧА: обработка ошибок с пом gulp-notify
 Запуск задачи из терминала: ./node_modules/.bin/gulp serve4
 */
gulp.task('less7', function () {
	return gulp.src('src/less/style.less')										//берем style.less
		.pipe(less())															//пропускаем через компилятор less
		.on('error', notify.onError())											//отобразить ошибку в консоли и всплывающюем баннере
		.pipe(gulp.dest('build/css'));											//выкладываем в билд в css
});

gulp.task('build15', gulp.series('clean1', 'html2', 'less7'));

gulp.task('serve4', gulp.series('build15', function () {
	gulp.watch('src/**/*.*', gulp.series('build15'));
}));


/*
 ------------------------------------------------------------------------------------
 #027 ЗАДАЧА: обработка ошибок с пом gulp-notify + plumber
 Запуск задачи из терминала: ./node_modules/.bin/gulp serve5
 */
gulp.task('less8', function () {
	return gulp.src('src/less/style.less')										//берем style.less
		.pipe(plumber({															//прокидываем pipe через plumber. теперь ошибка учтется на любом пайпе
			errorHandler: notify.onError()
		}))
		.pipe(less())															//пропускаем через компилятор less
		.pipe(gulp.dest('build/css'));											//выкладываем в билд в css
});

gulp.task('build16', gulp.series('clean1', 'html2', 'less8'));

gulp.task('serve5', gulp.series('build16', function () {
	gulp.watch('src/**/*.*', gulp.series('build16'));
}));


/*
 ------------------------------------------------------------------------------------
 #028 ЗАДАЧА: постпроцессинг (автопрефиксер, mqpacker)
 Запуск задачи из терминала: ./node_modules/.bin/gulp serve6
 */
gulp.task('less9', function () {
	return gulp.src('src/less/style.less')										//берем style.less
		.pipe(less())															//пропускаем через компилятор less
		.pipe(postcss([															//подключаем postcss
			autoprefixer({browsers: ['last 2 version']}),						//вендорный автопрефикс
			mqpacker({sort: true})												//объединение медиавыражений
		]))
		.pipe(gulp.dest('build/css'));											//выкладываем в билд в css
});

gulp.task('build17', gulp.series('clean1', 'html2', 'less9'));

gulp.task('serve6', gulp.series('build17', function () {
	gulp.watch('src/**/*.*', gulp.series('build17'));
}));


/*
 ------------------------------------------------------------------------------------
 #029 ЗАДАЧА: удалить из кода (из html-файлов) строки с комменатриями по разработке
 Запуск задачи из терминала: ./node_modules/.bin/gulp build18
 */
gulp.task('html4', function () {
	return gulp.src('src/**/*.html')											//берем все html-файлы (для примера)
		.pipe(debug({title: 'file '}))											//поставили дебаг, чтобы видно было, какие файлы копируются каждый раз
		.pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
		.pipe(gulp.dest('build'));												//помещаем в билд
});

gulp.task('build18', gulp.series('clean1', 'html4', 'less4'));


/*
 ------------------------------------------------------------------------------------
 #030 ЗАДАЧА: инклудим файлы
 Запуск задачи из терминала: ./node_modules/.bin/gulp build19
 */
gulp.task('html5', function () {
		return gulp.src('src/index.html')											//берем index.html
			.pipe(fileinclude({														//инклудим
				prefix: '@@',
				basepath: '@file'
			}))
			.pipe(gulp.dest('build'));
	}
);

gulp.task('build19', gulp.series('clean1', 'html5', 'less4'));


/*
 ------------------------------------------------------------------------------------
 #031 ЗАДАЧА: копировать все картинки в билд, не тратить время на скопированные ранее
 Запуск задачи из терминала: ./node_modules/.bin/gulp img1
 */
gulp.task('img1', function () {
	return gulp.src('src/img/*.{gif,png,jpg,jpeg,svg}')
		.pipe(newer('build/img'))													//сверяем с папкой build/img - отсекаем уже присутсвующие в ней
		.pipe(debug({title: 'file '}))												//поставили дебаг, чтобы видно было, какие файлы копируются каждый раз
		.pipe(gulp.dest('build/img'));
});


/*
 ------------------------------------------------------------------------------------
 #032 ЗАДАЧА: оптимизировать картинки для билда
 Запуск задачи из терминала: ./node_modules/.bin/gulp img2
 */
gulp.task('img2', function () {
	return gulp.src('src/img/*.{gif,png,jpg,jpeg,svg}')
		.pipe(debug({title: 'file '}))												//поставили дебаг, чтобы видно было, какие файлы копируются каждый раз
		.pipe(imagemin())															//оптимизируем
		.pipe(gulp.dest('build/img'));
});


/*
 ------------------------------------------------------------------------------------
 #033 ЗАДАЧА: углификация JS
 Запуск задачи из терминала: ./node_modules/.bin/gulp js1
 */
gulp.task('js1', function () {
	return gulp.src('src/js/script.js')
		.pipe(uglify())																//углификация
		.pipe(gulp.dest('build/js'));
});


/*
 ------------------------------------------------------------------------------------
 #034 ЗАДАЧА: углификация и конкатенация JS
 Запуск задачи из терминала: ./node_modules/.bin/gulp js2
 */
gulp.task('js2', function () {
	return gulp.src([
		'src/js/script.js',														//файлы
		'src/js/jquery-3.2.0.js'
	])
		.pipe(concat('script.min.js'))												//объединение в
		.pipe(uglify())																//углификация
		.pipe(gulp.dest('build/js'));
});


/*
 ------------------------------------------------------------------------------------
 #035 ЗАДАЧА: сжать CSS
 Запуск задачи из терминала: ./node_modules/.bin/gulp serve7
 */
gulp.task('less10', function () {
	return gulp.src('src/less/style.less')										//берем style.less
		.pipe(less())															//пропускаем через компилятор less
		.pipe(cleanCSS())														//сжимаем CSS
		.pipe(gulp.dest('build/css'));											//выкладываем в билд в css
});

gulp.task('build20', gulp.series('clean1', 'html2', 'less10'));

gulp.task('serve7', gulp.series('build20', function () {
	gulp.watch('src/**/*.*', gulp.series('build20'));
}));


/*
 ------------------------------------------------------------------------------------
 #036 ЗАДАЧА: добавить в имя CSS-файла хэш метку для борьбы с кэшированием
 Запуск задачи из терминала: ./node_modules/.bin/gulp build21
 */
gulp.task('less11', function () {
	return gulp.src('src/less/style.less')										//берем style.less
		.pipe(less())															//пропускаем через компилятор less
		.pipe(cleanCSS())														//сжимаем CSS
		.pipe(rev())															//переименовываем style.css (добавляем к имени хэш)
		.pipe(gulp.dest('build/css'))											//выкладываем в билд в css
		.pipe(rev.manifest('css.json'))											//метод rev.manifest откидывает поток выше, и сохраняет в указанный файл внесенные rev-ом
		// изменения - что на что было переименовано
		.pipe(gulp.dest('manifest'));											//сохраняем файл css.json в папку manifest
});

gulp.task('html6', function () {
	return gulp.src('src/**/*.html')											//берем все html-файлы (для примера)
		.pipe(debug({title: 'file '}))											//поставили дебаг, чтобы видно было, какие файлы копируются каждый раз
		.pipe(revReplace({														//плагин revReplace заменяет во всех файлах в потоке одно значение на другое
			manifest: gulp.src('manifest/css.json')								//берет он эти значения из указанного файла
		}))
		.pipe(gulp.dest('build'));												//помещаем в билд
});

gulp.task('build21', gulp.series('clean1', 'less11', 'html6'));


/*
 ------------------------------------------------------------------------------------
 #037 ЗАДАЧА: используем в задачах значения из package.json
 Запуск задачи из терминала: ./node_modules/.bin/gulp build22
 */
const pjson = require('./package.json');										//читаем содержимое package.json в константу
const dirs = pjson.config.directories;											//получим из константы другую константу с адресами папок сборки и исходников

gulp.task('build22', function () {
	return gulp.src(dirs.source + '/**/*.*')									//берем все файлы из папки указанной в константе
		.pipe(gulp.dest(dirs.build));											//кладем в папку, указанную в константе
});












