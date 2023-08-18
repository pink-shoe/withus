# 이미지 S3에 저장
# DB에 게임결과 저장
import pymysql
import traceback

class MySqlConnection:
    def __init__(self):
        self.insert_game_result_sql = "INSERT INTO game_result (game_result_id, is_correct, round, prediction, room_id, answer) VALUES (%s, %s, %s, %s, %s, %s)"
    def get_db_connection (self):      
        connection = pymysql.connect(
            host="connectwithus.site", 
            user="withus",
            password="withus",
            database="withus",
            charset='utf8',
            cursorclass=pymysql.cursors.DictCursor,
        )
        return connection
    
    def insert_into_game_result(self, game_result):
        db_connection = None
        try:
            db_connection = self.get_db_connection()

            with db_connection.cursor() as cursor:
                cursor.execute(self.insert_game_result_sql, (
                    game_result['room_id'] * 10 + game_result["round"],
                    game_result['is_correct'],
                    game_result['round'],
                    game_result['prediction'],
                    game_result['room_id'],
                    game_result['answer']
                ))
                db_connection.commit()
                return "OK", 200 
        except pymysql.Error as e:
            traceback.print_exc()
            if db_connection:
                db_connection.rollback()
            return "Internal Server Error", 500
        finally:
            if db_connection:
                db_connection.close()