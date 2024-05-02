#!/bin/bash
#chatappのDATABASEが無いと怒られた場合は最初の２行を消せばOK

# -uをdesigngreat パスワードをsaturday21　hostを該当エンドポイントに変更
mysql -u root -p<<EOF

USE yomitai

INSERT INTO genres(name)VALUES('総記');
INSERT INTO genres(name)VALUES('哲学・心理学・宗教');
INSERT INTO genres(name)VALUES('歴史・地理');
INSERT INTO genres(name)VALUES('社会科学');
INSERT INTO genres(name)VALUES('自然科学');
INSERT INTO genres(name)VALUES('工学・工業');
INSERT INTO genres(name)VALUES('産業');
INSERT INTO genres(name)VALUES('芸術・生活');
INSERT INTO genres(name)VALUES('語学');
INSERT INTO genres(name)VALUES('文学');

EOF