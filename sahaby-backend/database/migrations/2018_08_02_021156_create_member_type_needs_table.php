<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMemberTypeNeedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_type_needs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('type_need_id')->unsigned()->nullable()->default(null);
            $table->foreign('type_need_id')
                  ->references('id')
                  ->on('type_needs')
                  ->onDelete('cascade');
            $table->integer('member_id')->unsigned()->nullable()->default(null);
            $table->string('member_type')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('member_type_needs');
    }
}
