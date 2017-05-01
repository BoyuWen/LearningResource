/**
 * 
 */
package onest.dev;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * @author Administrator
 * 
 */
public class DatabaseUtil {

	public DatabaseUtil() {
		this.stat = getStatement();
	}

	private Connection conn;
	private Statement stat;
	private ResultSet rs;

	private Connection createConn() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
		}
		String url = "jdbc:mysql://127.0.0.1:3306/em?useUnicode=true&characterEncoding=UTF-8";
		try {
			conn = DriverManager.getConnection(url, "root", "");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}

	private Statement getStatement() {
		try {
			if (conn == null || conn.isClosed())
				conn = createConn();
			stat = conn.createStatement();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return stat;
	}

	public void update(String sql) {
		if (stat == null)
			stat = getStatement();
		try {
			stat.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public ResultSet query(String sql) {
		if (stat == null)
			stat = getStatement();
		try {
			rs = stat.executeQuery(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rs;
	}

	public void closeConn() {
		try {
			if (rs != null)
				rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			rs = null;
			try {
				if (stat != null)
					stat.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				stat = null;
				try {
					if (conn != null)
						conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					conn = null;
				}
			}
		}
	}

	/**
	 * @param args
	 */
public static void main(String[] args) {
	DatabaseUtil databaseUtil = new DatabaseUtil();
	String sql = "select * from jobs";
	ResultSet rs = databaseUtil.query(sql);

	try {
		while (rs.next()) {
			System.out.println(rs.getInt("id") + "  " + rs.getString("name"));
		}
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} finally {
		databaseUtil.closeConn();
	}
}

}
