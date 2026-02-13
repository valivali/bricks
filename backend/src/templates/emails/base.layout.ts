export const baseEmailLayout = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f7f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .header {
            background-color: #1a1a1a;
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .hero-image {
            width: 100%;
            height: 200px;
            background-color: #f0f0f0;
            background-image: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80');
            background-size: cover;
            background-position: center;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            font-size: 12px;
            color: #888;
            border-top: 1px solid #eee;
        }
        .button {
            display: inline-block;
            padding: 14px 30px;
            background-color: #1a1a1a;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 25px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            margin: 0 10px;
            color: #888;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>BRICKS</h1>
        </div>
        <div class="hero-image"></div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <div class="social-links">
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
            </div>
            <p>Problems or questions? Contact us at support@bricks.com</p>
            <p>&copy; ${new Date().getFullYear()} Bricks. All rights reserved.</p>
            <p>24 Hubert St, New York, NY 10013</p>
        </div>
    </div>
</body>
</html>
`
